import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISupplierTransactionStatus, SupplierTransactionStatus } from 'app/shared/model/vscommerce/supplier-transaction-status.model';
import { SupplierTransactionStatusService } from './supplier-transaction-status.service';
import { SupplierTransactionStatusComponent } from './supplier-transaction-status.component';
import { SupplierTransactionStatusDetailComponent } from './supplier-transaction-status-detail.component';
import { SupplierTransactionStatusUpdateComponent } from './supplier-transaction-status-update.component';

@Injectable({ providedIn: 'root' })
export class SupplierTransactionStatusResolve implements Resolve<ISupplierTransactionStatus> {
  constructor(private service: SupplierTransactionStatusService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplierTransactionStatus> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((supplierTransactionStatus: HttpResponse<SupplierTransactionStatus>) => {
          if (supplierTransactionStatus.body) {
            return of(supplierTransactionStatus.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SupplierTransactionStatus());
  }
}

export const supplierTransactionStatusRoute: Routes = [
  {
    path: '',
    component: SupplierTransactionStatusComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierTransactionStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SupplierTransactionStatusDetailComponent,
    resolve: {
      supplierTransactionStatus: SupplierTransactionStatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierTransactionStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SupplierTransactionStatusUpdateComponent,
    resolve: {
      supplierTransactionStatus: SupplierTransactionStatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierTransactionStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SupplierTransactionStatusUpdateComponent,
    resolve: {
      supplierTransactionStatus: SupplierTransactionStatusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierTransactionStatus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
