import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IShippingFeeChart, ShippingFeeChart } from 'app/shared/model/vscommerce/shipping-fee-chart.model';
import { ShippingFeeChartService } from './shipping-fee-chart.service';
import { ShippingFeeChartComponent } from './shipping-fee-chart.component';
import { ShippingFeeChartDetailComponent } from './shipping-fee-chart-detail.component';
import { ShippingFeeChartUpdateComponent } from './shipping-fee-chart-update.component';

@Injectable({ providedIn: 'root' })
export class ShippingFeeChartResolve implements Resolve<IShippingFeeChart> {
  constructor(private service: ShippingFeeChartService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShippingFeeChart> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((shippingFeeChart: HttpResponse<ShippingFeeChart>) => {
          if (shippingFeeChart.body) {
            return of(shippingFeeChart.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ShippingFeeChart());
  }
}

export const shippingFeeChartRoute: Routes = [
  {
    path: '',
    component: ShippingFeeChartComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShippingFeeChart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShippingFeeChartDetailComponent,
    resolve: {
      shippingFeeChart: ShippingFeeChartResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShippingFeeChart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShippingFeeChartUpdateComponent,
    resolve: {
      shippingFeeChart: ShippingFeeChartResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShippingFeeChart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShippingFeeChartUpdateComponent,
    resolve: {
      shippingFeeChart: ShippingFeeChartResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShippingFeeChart.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
