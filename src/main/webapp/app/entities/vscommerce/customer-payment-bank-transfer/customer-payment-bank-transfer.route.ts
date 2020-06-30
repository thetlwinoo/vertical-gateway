import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import {
  ICustomerPaymentBankTransfer,
  CustomerPaymentBankTransfer,
} from 'app/shared/model/vscommerce/customer-payment-bank-transfer.model';
import { CustomerPaymentBankTransferService } from './customer-payment-bank-transfer.service';
import { CustomerPaymentBankTransferComponent } from './customer-payment-bank-transfer.component';
import { CustomerPaymentBankTransferDetailComponent } from './customer-payment-bank-transfer-detail.component';
import { CustomerPaymentBankTransferUpdateComponent } from './customer-payment-bank-transfer-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerPaymentBankTransferResolve implements Resolve<ICustomerPaymentBankTransfer> {
  constructor(private service: CustomerPaymentBankTransferService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerPaymentBankTransfer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerPaymentBankTransfer: HttpResponse<CustomerPaymentBankTransfer>) => {
          if (customerPaymentBankTransfer.body) {
            return of(customerPaymentBankTransfer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerPaymentBankTransfer());
  }
}

export const customerPaymentBankTransferRoute: Routes = [
  {
    path: '',
    component: CustomerPaymentBankTransferComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentBankTransfer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerPaymentBankTransferDetailComponent,
    resolve: {
      customerPaymentBankTransfer: CustomerPaymentBankTransferResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentBankTransfer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerPaymentBankTransferUpdateComponent,
    resolve: {
      customerPaymentBankTransfer: CustomerPaymentBankTransferResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentBankTransfer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerPaymentBankTransferUpdateComponent,
    resolve: {
      customerPaymentBankTransfer: CustomerPaymentBankTransferResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerPaymentBankTransfer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
