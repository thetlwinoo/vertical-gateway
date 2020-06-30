import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUploadTransactions, UploadTransactions } from 'app/shared/model/vscommerce/upload-transactions.model';
import { UploadTransactionsService } from './upload-transactions.service';
import { UploadTransactionsComponent } from './upload-transactions.component';
import { UploadTransactionsDetailComponent } from './upload-transactions-detail.component';
import { UploadTransactionsUpdateComponent } from './upload-transactions-update.component';

@Injectable({ providedIn: 'root' })
export class UploadTransactionsResolve implements Resolve<IUploadTransactions> {
  constructor(private service: UploadTransactionsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUploadTransactions> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((uploadTransactions: HttpResponse<UploadTransactions>) => {
          if (uploadTransactions.body) {
            return of(uploadTransactions.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UploadTransactions());
  }
}

export const uploadTransactionsRoute: Routes = [
  {
    path: '',
    component: UploadTransactionsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUploadTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UploadTransactionsDetailComponent,
    resolve: {
      uploadTransactions: UploadTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUploadTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UploadTransactionsUpdateComponent,
    resolve: {
      uploadTransactions: UploadTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUploadTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UploadTransactionsUpdateComponent,
    resolve: {
      uploadTransactions: UploadTransactionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUploadTransactions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
