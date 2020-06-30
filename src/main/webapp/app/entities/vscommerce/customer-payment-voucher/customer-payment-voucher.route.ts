import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerPaymentVoucher, CustomerPaymentVoucher } from 'app/shared/model/vscommerce/customer-payment-voucher.model';
import { CustomerPaymentVoucherService } from './customer-payment-voucher.service';
import { CustomerPaymentVoucherComponent } from './customer-payment-voucher.component';
import { CustomerPaymentVoucherDetailComponent } from './customer-payment-voucher-detail.component';
import { CustomerPaymentVoucherUpdateComponent } from './customer-payment-voucher-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerPaymentVoucherResolve implements Resolve<ICustomerPaymentVoucher> {
  constructor(private service: CustomerPaymentVoucherService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerPaymentVoucher> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerPaymentVoucher: HttpResponse<CustomerPaymentVoucher>) => {
          if (customerPaymentVoucher.body) {
            return of(customerPaymentVoucher.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerPaymentVoucher());
  }
}

export const customerPaymentVoucherRoute: Routes = [
  {
    path: '',
    component: CustomerPaymentVoucherComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentVoucher.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerPaymentVoucherDetailComponent,
    resolve: {
      customerPaymentVoucher: CustomerPaymentVoucherResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentVoucher.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerPaymentVoucherUpdateComponent,
    resolve: {
      customerPaymentVoucher: CustomerPaymentVoucherResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentVoucher.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerPaymentVoucherUpdateComponent,
    resolve: {
      customerPaymentVoucher: CustomerPaymentVoucherResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentVoucher.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
