import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOrderTracking, OrderTracking } from 'app/shared/model/vscommerce/order-tracking.model';
import { OrderTrackingService } from './order-tracking.service';
import { OrderTrackingComponent } from './order-tracking.component';
import { OrderTrackingDetailComponent } from './order-tracking-detail.component';
import { OrderTrackingUpdateComponent } from './order-tracking-update.component';

@Injectable({ providedIn: 'root' })
export class OrderTrackingResolve implements Resolve<IOrderTracking> {
  constructor(private service: OrderTrackingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderTracking> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((orderTracking: HttpResponse<OrderTracking>) => {
          if (orderTracking.body) {
            return of(orderTracking.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrderTracking());
  }
}

export const orderTrackingRoute: Routes = [
  {
    path: '',
    component: OrderTrackingComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderTracking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrderTrackingDetailComponent,
    resolve: {
      orderTracking: OrderTrackingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderTracking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrderTrackingUpdateComponent,
    resolve: {
      orderTracking: OrderTrackingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderTracking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrderTrackingUpdateComponent,
    resolve: {
      orderTracking: OrderTrackingResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderTracking.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
