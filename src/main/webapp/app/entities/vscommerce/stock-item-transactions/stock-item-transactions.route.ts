import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStockItemTransactions, StockItemTransactions } from 'app/shared/model/vscommerce/stock-item-transactions.model';
import { StockItemTransactionsService } from './stock-item-transactions.service';
import { StockItemTransactionsComponent } from './stock-item-transactions.component';
import { StockItemTransactionsDetailComponent } from './stock-item-transactions-detail.component';
import { StockItemTransactionsUpdateComponent } from './stock-item-transactions-update.component';

@Injectable({ providedIn: 'root' })
export class StockItemTransactionsResolve implements Resolve<IStockItemTransactions> {
  constructor(private service: StockItemTransactionsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStockItemTransactions> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((stockItemTransactions: HttpResponse<StockItemTransactions>) => {
          if (stockItemTransactions.body) {
            return of(stockItemTransactions.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StockItemTransactions());
  }
}

export const stockItemTransactionsRoute: Routes = [
  {
    path: '',
    component: StockItemTransactionsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItemTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StockItemTransactionsDetailComponent,
    resolve: {
      stockItemTransactions: StockItemTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItemTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StockItemTransactionsUpdateComponent,
    resolve: {
      stockItemTransactions: StockItemTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItemTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StockItemTransactionsUpdateComponent,
    resolve: {
      stockItemTransactions: StockItemTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStockItemTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
