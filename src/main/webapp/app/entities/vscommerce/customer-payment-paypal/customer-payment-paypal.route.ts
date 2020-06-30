import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerPaymentPaypal, CustomerPaymentPaypal } from 'app/shared/model/vscommerce/customer-payment-paypal.model';
import { CustomerPaymentPaypalService } from './customer-payment-paypal.service';
import { CustomerPaymentPaypalComponent } from './customer-payment-paypal.component';
import { CustomerPaymentPaypalDetailComponent } from './customer-payment-paypal-detail.component';
import { CustomerPaymentPaypalUpdateComponent } from './customer-payment-paypal-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerPaymentPaypalResolve implements Resolve<ICustomerPaymentPaypal> {
  constructor(private service: CustomerPaymentPaypalService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerPaymentPaypal> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerPaymentPaypal: HttpResponse<CustomerPaymentPaypal>) => {
          if (customerPaymentPaypal.body) {
            return of(customerPaymentPaypal.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerPaymentPaypal());
  }
}

export const customerPaymentPaypalRoute: Routes = [
  {
    path: '',
    component: CustomerPaymentPaypalComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentPaypal.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerPaymentPaypalDetailComponent,
    resolve: {
      customerPaymentPaypal: CustomerPaymentPaypalResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentPaypal.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerPaymentPaypalUpdateComponent,
    resolve: {
      customerPaymentPaypal: CustomerPaymentPaypalResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentPaypal.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerPaymentPaypalUpdateComponent,
    resolve: {
      customerPaymentPaypal: CustomerPaymentPaypalResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentPaypal.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
