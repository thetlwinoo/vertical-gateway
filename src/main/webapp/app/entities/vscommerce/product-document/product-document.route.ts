import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductDocument, ProductDocument } from 'app/shared/model/vscommerce/product-document.model';
import { ProductDocumentService } from './product-document.service';
import { ProductDocumentComponent } from './product-document.component';
import { ProductDocumentDetailComponent } from './product-document-detail.component';
import { ProductDocumentUpdateComponent } from './product-document-update.component';

@Injectable({ providedIn: 'root' })
export class ProductDocumentResolve implements Resolve<IProductDocument> {
  constructor(private service: ProductDocumentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductDocument> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productDocument: HttpResponse<ProductDocument>) => {
          if (productDocument.body) {
            return of(productDocument.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductDocument());
  }
}

export const productDocumentRoute: Routes = [
  {
    path: '',
    component: ProductDocumentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductDocument.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductDocumentDetailComponent,
    resolve: {
      productDocument: ProductDocumentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductDocument.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductDocumentUpdateComponent,
    resolve: {
      productDocument: ProductDocumentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductDocument.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductDocumentUpdateComponent,
    resolve: {
      productDocument: ProductDocumentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductDocument.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
