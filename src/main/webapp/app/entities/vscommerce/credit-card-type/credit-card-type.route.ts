import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICreditCardType, CreditCardType } from 'app/shared/model/vscommerce/credit-card-type.model';
import { CreditCardTypeService } from './credit-card-type.service';
import { CreditCardTypeComponent } from './credit-card-type.component';
import { CreditCardTypeDetailComponent } from './credit-card-type-detail.component';
import { CreditCardTypeUpdateComponent } from './credit-card-type-update.component';

@Injectable({ providedIn: 'root' })
export class CreditCardTypeResolve implements Resolve<ICreditCardType> {
  constructor(private service: CreditCardTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICreditCardType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((creditCardType: HttpResponse<CreditCardType>) => {
          if (creditCardType.body) {
            return of(creditCardType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CreditCardType());
  }
}

export const creditCardTypeRoute: Routes = [
  {
    path: '',
    component: CreditCardTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCreditCardType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CreditCardTypeDetailComponent,
    resolve: {
      creditCardType: CreditCardTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCreditCardType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CreditCardTypeUpdateComponent,
    resolve: {
      creditCardType: CreditCardTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCreditCardType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CreditCardTypeUpdateComponent,
    resolve: {
      creditCardType: CreditCardTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCreditCardType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
