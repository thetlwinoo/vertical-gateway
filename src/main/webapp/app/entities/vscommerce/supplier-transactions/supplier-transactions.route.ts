import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISupplierTransactions, SupplierTransactions } from 'app/shared/model/vscommerce/supplier-transactions.model';
import { SupplierTransactionsService } from './supplier-transactions.service';
import { SupplierTransactionsComponent } from './supplier-transactions.component';
import { SupplierTransactionsDetailComponent } from './supplier-transactions-detail.component';
import { SupplierTransactionsUpdateComponent } from './supplier-transactions-update.component';

@Injectable({ providedIn: 'root' })
export class SupplierTransactionsResolve implements Resolve<ISupplierTransactions> {
  constructor(private service: SupplierTransactionsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplierTransactions> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((supplierTransactions: HttpResponse<SupplierTransactions>) => {
          if (supplierTransactions.body) {
            return of(supplierTransactions.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SupplierTransactions());
  }
}

export const supplierTransactionsRoute: Routes = [
  {
    path: '',
    component: SupplierTransactionsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SupplierTransactionsDetailComponent,
    resolve: {
      supplierTransactions: SupplierTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SupplierTransactionsUpdateComponent,
    resolve: {
      supplierTransactions: SupplierTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SupplierTransactionsUpdateComponent,
    resolve: {
      supplierTransactions: SupplierTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
