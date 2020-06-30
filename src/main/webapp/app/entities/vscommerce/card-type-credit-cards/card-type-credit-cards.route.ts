import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICardTypeCreditCards, CardTypeCreditCards } from 'app/shared/model/vscommerce/card-type-credit-cards.model';
import { CardTypeCreditCardsService } from './card-type-credit-cards.service';
import { CardTypeCreditCardsComponent } from './card-type-credit-cards.component';
import { CardTypeCreditCardsDetailComponent } from './card-type-credit-cards-detail.component';
import { CardTypeCreditCardsUpdateComponent } from './card-type-credit-cards-update.component';

@Injectable({ providedIn: 'root' })
export class CardTypeCreditCardsResolve implements Resolve<ICardTypeCreditCards> {
  constructor(private service: CardTypeCreditCardsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardTypeCreditCards> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cardTypeCreditCards: HttpResponse<CardTypeCreditCards>) => {
          if (cardTypeCreditCards.body) {
            return of(cardTypeCreditCards.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CardTypeCreditCards());
  }
}

export const cardTypeCreditCardsRoute: Routes = [
  {
    path: '',
    component: CardTypeCreditCardsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCardTypeCreditCards.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CardTypeCreditCardsDetailComponent,
    resolve: {
      cardTypeCreditCards: CardTypeCreditCardsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCardTypeCreditCards.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CardTypeCreditCardsUpdateComponent,
    resolve: {
      cardTypeCreditCards: CardTypeCreditCardsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCardTypeCreditCards.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CardTypeCreditCardsUpdateComponent,
    resolve: {
      cardTypeCreditCards: CardTypeCreditCardsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCardTypeCreditCards.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
