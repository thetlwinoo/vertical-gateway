import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IReceipts, Receipts } from 'app/shared/model/vscommerce/receipts.model';
import { ReceiptsService } from './receipts.service';
import { ReceiptsComponent } from './receipts.component';
import { ReceiptsDetailComponent } from './receipts-detail.component';
import { ReceiptsUpdateComponent } from './receipts-update.component';

@Injectable({ providedIn: 'root' })
export class ReceiptsResolve implements Resolve<IReceipts> {
  constructor(private service: ReceiptsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReceipts> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((receipts: HttpResponse<Receipts>) => {
          if (receipts.body) {
            return of(receipts.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Receipts());
  }
}

export const receiptsRoute: Routes = [
  {
    path: '',
    component: ReceiptsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceReceipts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReceiptsDetailComponent,
    resolve: {
      receipts: ReceiptsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceReceipts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReceiptsUpdateComponent,
    resolve: {
      receipts: ReceiptsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceReceipts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReceiptsUpdateComponent,
    resolve: {
      receipts: ReceiptsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceReceipts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
