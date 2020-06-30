import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPurchaseOrders, PurchaseOrders } from 'app/shared/model/vscommerce/purchase-orders.model';
import { PurchaseOrdersService } from './purchase-orders.service';
import { PurchaseOrdersComponent } from './purchase-orders.component';
import { PurchaseOrdersDetailComponent } from './purchase-orders-detail.component';
import { PurchaseOrdersUpdateComponent } from './purchase-orders-update.component';

@Injectable({ providedIn: 'root' })
export class PurchaseOrdersResolve implements Resolve<IPurchaseOrders> {
  constructor(private service: PurchaseOrdersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPurchaseOrders> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((purchaseOrders: HttpResponse<PurchaseOrders>) => {
          if (purchaseOrders.body) {
            return of(purchaseOrders.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PurchaseOrders());
  }
}

export const purchaseOrdersRoute: Routes = [
  {
    path: '',
    component: PurchaseOrdersComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePurchaseOrders.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PurchaseOrdersDetailComponent,
    resolve: {
      purchaseOrders: PurchaseOrdersResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePurchaseOrders.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PurchaseOrdersUpdateComponent,
    resolve: {
      purchaseOrders: PurchaseOrdersResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePurchaseOrders.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PurchaseOrdersUpdateComponent,
    resolve: {
      purchaseOrders: PurchaseOrdersResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePurchaseOrders.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
