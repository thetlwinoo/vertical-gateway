import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IInvoiceLines, InvoiceLines } from 'app/shared/model/vscommerce/invoice-lines.model';
import { InvoiceLinesService } from './invoice-lines.service';
import { InvoiceLinesComponent } from './invoice-lines.component';
import { InvoiceLinesDetailComponent } from './invoice-lines-detail.component';
import { InvoiceLinesUpdateComponent } from './invoice-lines-update.component';

@Injectable({ providedIn: 'root' })
export class InvoiceLinesResolve implements Resolve<IInvoiceLines> {
  constructor(private service: InvoiceLinesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInvoiceLines> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((invoiceLines: HttpResponse<InvoiceLines>) => {
          if (invoiceLines.body) {
            return of(invoiceLines.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new InvoiceLines());
  }
}

export const invoiceLinesRoute: Routes = [
  {
    path: '',
    component: InvoiceLinesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceInvoiceLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InvoiceLinesDetailComponent,
    resolve: {
      invoiceLines: InvoiceLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceInvoiceLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InvoiceLinesUpdateComponent,
    resolve: {
      invoiceLines: InvoiceLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceInvoiceLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InvoiceLinesUpdateComponent,
    resolve: {
      invoiceLines: InvoiceLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceInvoiceLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
