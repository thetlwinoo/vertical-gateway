import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOrderLines, OrderLines } from 'app/shared/model/vscommerce/order-lines.model';
import { OrderLinesService } from './order-lines.service';
import { OrderLinesComponent } from './order-lines.component';
import { OrderLinesDetailComponent } from './order-lines-detail.component';
import { OrderLinesUpdateComponent } from './order-lines-update.component';

@Injectable({ providedIn: 'root' })
export class OrderLinesResolve implements Resolve<IOrderLines> {
  constructor(private service: OrderLinesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderLines> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((orderLines: HttpResponse<OrderLines>) => {
          if (orderLines.body) {
            return of(orderLines.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrderLines());
  }
}

export const orderLinesRoute: Routes = [
  {
    path: '',
    component: OrderLinesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrderLinesDetailComponent,
    resolve: {
      orderLines: OrderLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrderLinesUpdateComponent,
    resolve: {
      orderLines: OrderLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrderLinesUpdateComponent,
    resolve: {
      orderLines: OrderLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
