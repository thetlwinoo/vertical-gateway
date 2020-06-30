import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPurchaseOrderLines, PurchaseOrderLines } from 'app/shared/model/vscommerce/purchase-order-lines.model';
import { PurchaseOrderLinesService } from './purchase-order-lines.service';
import { PurchaseOrderLinesComponent } from './purchase-order-lines.component';
import { PurchaseOrderLinesDetailComponent } from './purchase-order-lines-detail.component';
import { PurchaseOrderLinesUpdateComponent } from './purchase-order-lines-update.component';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderLinesResolve implements Resolve<IPurchaseOrderLines> {
  constructor(private service: PurchaseOrderLinesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchaseOrderLines> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((purchaseOrderLines: HttpResponse<PurchaseOrderLines>) => {
          if (purchaseOrderLines.body) {
            return of(purchaseOrderLines.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PurchaseOrderLines());
  }
}

export const purchaseOrderLinesRoute: Routes = [
  {
    path: '',
    component: PurchaseOrderLinesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePurchaseOrderLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PurchaseOrderLinesDetailComponent,
    resolve: {
      purchaseOrderLines: PurchaseOrderLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePurchaseOrderLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PurchaseOrderLinesUpdateComponent,
    resolve: {
      purchaseOrderLines: PurchaseOrderLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePurchaseOrderLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PurchaseOrderLinesUpdateComponent,
    resolve: {
      purchaseOrderLines: PurchaseOrderLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePurchaseOrderLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
