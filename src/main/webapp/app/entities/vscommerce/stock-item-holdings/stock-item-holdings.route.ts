import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStockItemHoldings, StockItemHoldings } from 'app/shared/model/vscommerce/stock-item-holdings.model';
import { StockItemHoldingsService } from './stock-item-holdings.service';
import { StockItemHoldingsComponent } from './stock-item-holdings.component';
import { StockItemHoldingsDetailComponent } from './stock-item-holdings-detail.component';
import { StockItemHoldingsUpdateComponent } from './stock-item-holdings-update.component';

@Injectable({ providedIn: 'root' })
export class StockItemHoldingsResolve implements Resolve<IStockItemHoldings> {
  constructor(private service: StockItemHoldingsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStockItemHoldings> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((stockItemHoldings: HttpResponse<StockItemHoldings>) => {
          if (stockItemHoldings.body) {
            return of(stockItemHoldings.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StockItemHoldings());
  }
}

export const stockItemHoldingsRoute: Routes = [
  {
    path: '',
    component: StockItemHoldingsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItemHoldings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StockItemHoldingsDetailComponent,
    resolve: {
      stockItemHoldings: StockItemHoldingsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItemHoldings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StockItemHoldingsUpdateComponent,
    resolve: {
      stockItemHoldings: StockItemHoldingsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItemHoldings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StockItemHoldingsUpdateComponent,
    resolve: {
      stockItemHoldings: StockItemHoldingsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItemHoldings.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
