import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductAttributeSet, ProductAttributeSet } from 'app/shared/model/vscommerce/product-attribute-set.model';
import { ProductAttributeSetService } from './product-attribute-set.service';
import { ProductAttributeSetComponent } from './product-attribute-set.component';
import { ProductAttributeSetDetailComponent } from './product-attribute-set-detail.component';
import { ProductAttributeSetUpdateComponent } from './product-attribute-set-update.component';

@Injectable({ providedIn: 'root' })
export class ProductAttributeSetResolve implements Resolve<IProductAttributeSet> {
  constructor(private service: ProductAttributeSetService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductAttributeSet> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productAttributeSet: HttpResponse<ProductAttributeSet>) => {
          if (productAttributeSet.body) {
            return of(productAttributeSet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductAttributeSet());
  }
}

export const productAttributeSetRoute: Routes = [
  {
    path: '',
    component: ProductAttributeSetComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductAttributeSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductAttributeSetDetailComponent,
    resolve: {
      productAttributeSet: ProductAttributeSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductAttributeSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductAttributeSetUpdateComponent,
    resolve: {
      productAttributeSet: ProductAttributeSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductAttributeSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductAttributeSetUpdateComponent,
    resolve: {
      productAttributeSet: ProductAttributeSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductAttributeSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
