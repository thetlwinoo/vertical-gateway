import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductAttribute, ProductAttribute } from 'app/shared/model/vscommerce/product-attribute.model';
import { ProductAttributeService } from './product-attribute.service';
import { ProductAttributeComponent } from './product-attribute.component';
import { ProductAttributeDetailComponent } from './product-attribute-detail.component';
import { ProductAttributeUpdateComponent } from './product-attribute-update.component';

@Injectable({ providedIn: 'root' })
export class ProductAttributeResolve implements Resolve<IProductAttribute> {
  constructor(private service: ProductAttributeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductAttribute> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productAttribute: HttpResponse<ProductAttribute>) => {
          if (productAttribute.body) {
            return of(productAttribute.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductAttribute());
  }
}

export const productAttributeRoute: Routes = [
  {
    path: '',
    component: ProductAttributeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductAttribute.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductAttributeDetailComponent,
    resolve: {
      productAttribute: ProductAttributeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductAttribute.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductAttributeUpdateComponent,
    resolve: {
      productAttribute: ProductAttributeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductAttribute.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductAttributeUpdateComponent,
    resolve: {
      productAttribute: ProductAttributeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductAttribute.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
