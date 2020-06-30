import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductBrand, ProductBrand } from 'app/shared/model/vscommerce/product-brand.model';
import { ProductBrandService } from './product-brand.service';
import { ProductBrandComponent } from './product-brand.component';
import { ProductBrandDetailComponent } from './product-brand-detail.component';
import { ProductBrandUpdateComponent } from './product-brand-update.component';

@Injectable({ providedIn: 'root' })
export class ProductBrandResolve implements Resolve<IProductBrand> {
  constructor(private service: ProductBrandService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductBrand> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productBrand: HttpResponse<ProductBrand>) => {
          if (productBrand.body) {
            return of(productBrand.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductBrand());
  }
}

export const productBrandRoute: Routes = [
  {
    path: '',
    component: ProductBrandComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductBrand.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductBrandDetailComponent,
    resolve: {
      productBrand: ProductBrandResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductBrand.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductBrandUpdateComponent,
    resolve: {
      productBrand: ProductBrandResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductBrand.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductBrandUpdateComponent,
    resolve: {
      productBrand: ProductBrandResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductBrand.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
