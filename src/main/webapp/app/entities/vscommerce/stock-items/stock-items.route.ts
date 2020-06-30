import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStockItems, StockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from './stock-items.service';
import { StockItemsComponent } from './stock-items.component';
import { StockItemsDetailComponent } from './stock-items-detail.component';
import { StockItemsUpdateComponent } from './stock-items-update.component';

@Injectable({ providedIn: 'root' })
export class StockItemsResolve implements Resolve<IStockItems> {
  constructor(private service: StockItemsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStockItems> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((stockItems: HttpResponse<StockItems>) => {
          if (stockItems.body) {
            return of(stockItems.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StockItems());
  }
}

export const stockItemsRoute: Routes = [
  {
    path: '',
    component: StockItemsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.vscommerceStockItems.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StockItemsDetailComponent,
    resolve: {
      stockItems: StockItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItems.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StockItemsUpdateComponent,
    resolve: {
      stockItems: StockItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItems.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StockItemsUpdateComponent,
    resolve: {
      stockItems: StockItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItems.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
