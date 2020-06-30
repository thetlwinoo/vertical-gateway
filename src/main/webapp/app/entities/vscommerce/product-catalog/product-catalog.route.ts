import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductCatalog, ProductCatalog } from 'app/shared/model/vscommerce/product-catalog.model';
import { ProductCatalogService } from './product-catalog.service';
import { ProductCatalogComponent } from './product-catalog.component';
import { ProductCatalogDetailComponent } from './product-catalog-detail.component';
import { ProductCatalogUpdateComponent } from './product-catalog-update.component';

@Injectable({ providedIn: 'root' })
export class ProductCatalogResolve implements Resolve<IProductCatalog> {
  constructor(private service: ProductCatalogService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductCatalog> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productCatalog: HttpResponse<ProductCatalog>) => {
          if (productCatalog.body) {
            return of(productCatalog.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductCatalog());
  }
}

export const productCatalogRoute: Routes = [
  {
    path: '',
    component: ProductCatalogComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductCatalog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductCatalogDetailComponent,
    resolve: {
      productCatalog: ProductCatalogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductCatalog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductCatalogUpdateComponent,
    resolve: {
      productCatalog: ProductCatalogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductCatalog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductCatalogUpdateComponent,
    resolve: {
      productCatalog: ProductCatalogResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductCatalog.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
