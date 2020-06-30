import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerPayment, CustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';
import { CustomerPaymentService } from './customer-payment.service';
import { CustomerPaymentComponent } from './customer-payment.component';
import { CustomerPaymentDetailComponent } from './customer-payment-detail.component';
import { CustomerPaymentUpdateComponent } from './customer-payment-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerPaymentResolve implements Resolve<ICustomerPayment> {
  constructor(private service: CustomerPaymentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerPayment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerPayment: HttpResponse<CustomerPayment>) => {
          if (customerPayment.body) {
            return of(customerPayment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerPayment());
  }
}

export const customerPaymentRoute: Routes = [
  {
    path: '',
    component: CustomerPaymentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPayment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerPaymentDetailComponent,
    resolve: {
      customerPayment: CustomerPaymentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPayment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerPaymentUpdateComponent,
    resolve: {
      customerPayment: CustomerPaymentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPayment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerPaymentUpdateComponent,
    resolve: {
      customerPayment: CustomerPaymentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPayment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
