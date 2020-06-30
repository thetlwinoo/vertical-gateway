import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import {
  ICustomerPaymentCreditCardExtended,
  CustomerPaymentCreditCardExtended,
} from 'app/shared/model/vscommerce/customer-payment-credit-card-extended.model';
import { CustomerPaymentCreditCardExtendedService } from './customer-payment-credit-card-extended.service';
import { CustomerPaymentCreditCardExtendedComponent } from './customer-payment-credit-card-extended.component';
import { CustomerPaymentCreditCardExtendedDetailComponent } from './customer-payment-credit-card-extended-detail.component';
import { CustomerPaymentCreditCardExtendedUpdateComponent } from './customer-payment-credit-card-extended-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerPaymentCreditCardExtendedResolve implements Resolve<ICustomerPaymentCreditCardExtended> {
  constructor(private service: CustomerPaymentCreditCardExtendedService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerPaymentCreditCardExtended> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerPaymentCreditCardExtended: HttpResponse<CustomerPaymentCreditCardExtended>) => {
          if (customerPaymentCreditCardExtended.body) {
            return of(customerPaymentCreditCardExtended.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerPaymentCreditCardExtended());
  }
}

export const customerPaymentCreditCardExtendedRoute: Routes = [
  {
    path: '',
    component: CustomerPaymentCreditCardExtendedComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentCreditCardExtended.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerPaymentCreditCardExtendedDetailComponent,
    resolve: {
      customerPaymentCreditCardExtended: CustomerPaymentCreditCardExtendedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentCreditCardExtended.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerPaymentCreditCardExtendedUpdateComponent,
    resolve: {
      customerPaymentCreditCardExtended: CustomerPaymentCreditCardExtendedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentCreditCardExtended.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerPaymentCreditCardExtendedUpdateComponent,
    resolve: {
      customerPaymentCreditCardExtended: CustomerPaymentCreditCardExtendedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentCreditCardExtended.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
