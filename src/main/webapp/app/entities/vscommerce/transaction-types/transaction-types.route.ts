import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITransactionTypes, TransactionTypes } from 'app/shared/model/vscommerce/transaction-types.model';
import { TransactionTypesService } from './transaction-types.service';
import { TransactionTypesComponent } from './transaction-types.component';
import { TransactionTypesDetailComponent } from './transaction-types-detail.component';
import { TransactionTypesUpdateComponent } from './transaction-types-update.component';

@Injectable({ providedIn: 'root' })
export class TransactionTypesResolve implements Resolve<ITransactionTypes> {
  constructor(private service: TransactionTypesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransactionTypes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((transactionTypes: HttpResponse<TransactionTypes>) => {
          if (transactionTypes.body) {
            return of(transactionTypes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TransactionTypes());
  }
}

export const transactionTypesRoute: Routes = [
  {
    path: '',
    component: TransactionTypesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTransactionTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TransactionTypesDetailComponent,
    resolve: {
      transactionTypes: TransactionTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTransactionTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TransactionTypesUpdateComponent,
    resolve: {
      transactionTypes: TransactionTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTransactionTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TransactionTypesUpdateComponent,
    resolve: {
      transactionTypes: TransactionTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTransactionTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
