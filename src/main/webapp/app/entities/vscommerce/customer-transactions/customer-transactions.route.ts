import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerTransactions, CustomerTransactions } from 'app/shared/model/vscommerce/customer-transactions.model';
import { CustomerTransactionsService } from './customer-transactions.service';
import { CustomerTransactionsComponent } from './customer-transactions.component';
import { CustomerTransactionsDetailComponent } from './customer-transactions-detail.component';
import { CustomerTransactionsUpdateComponent } from './customer-transactions-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerTransactionsResolve implements Resolve<ICustomerTransactions> {
  constructor(private service: CustomerTransactionsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerTransactions> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerTransactions: HttpResponse<CustomerTransactions>) => {
          if (customerTransactions.body) {
            return of(customerTransactions.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerTransactions());
  }
}

export const customerTransactionsRoute: Routes = [
  {
    path: '',
    component: CustomerTransactionsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerTransactionsDetailComponent,
    resolve: {
      customerTransactions: CustomerTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerTransactionsUpdateComponent,
    resolve: {
      customerTransactions: CustomerTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerTransactionsUpdateComponent,
    resolve: {
      customerTransactions: CustomerTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
