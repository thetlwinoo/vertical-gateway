import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICardTypes, CardTypes } from 'app/shared/model/vscommerce/card-types.model';
import { CardTypesService } from './card-types.service';
import { CardTypesComponent } from './card-types.component';
import { CardTypesDetailComponent } from './card-types-detail.component';
import { CardTypesUpdateComponent } from './card-types-update.component';

@Injectable({ providedIn: 'root' })
export class CardTypesResolve implements Resolve<ICardTypes> {
  constructor(private service: CardTypesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardTypes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cardTypes: HttpResponse<CardTypes>) => {
          if (cardTypes.body) {
            return of(cardTypes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CardTypes());
  }
}

export const cardTypesRoute: Routes = [
  {
    path: '',
    component: CardTypesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCardTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CardTypesDetailComponent,
    resolve: {
      cardTypes: CardTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCardTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CardTypesUpdateComponent,
    resolve: {
      cardTypes: CardTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCardTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CardTypesUpdateComponent,
    resolve: {
      cardTypes: CardTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCardTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
