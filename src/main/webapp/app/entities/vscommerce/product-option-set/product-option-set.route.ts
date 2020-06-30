import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductOptionSet, ProductOptionSet } from 'app/shared/model/vscommerce/product-option-set.model';
import { ProductOptionSetService } from './product-option-set.service';
import { ProductOptionSetComponent } from './product-option-set.component';
import { ProductOptionSetDetailComponent } from './product-option-set-detail.component';
import { ProductOptionSetUpdateComponent } from './product-option-set-update.component';

@Injectable({ providedIn: 'root' })
export class ProductOptionSetResolve implements Resolve<IProductOptionSet> {
  constructor(private service: ProductOptionSetService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductOptionSet> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productOptionSet: HttpResponse<ProductOptionSet>) => {
          if (productOptionSet.body) {
            return of(productOptionSet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductOptionSet());
  }
}

export const productOptionSetRoute: Routes = [
  {
    path: '',
    component: ProductOptionSetComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductOptionSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductOptionSetDetailComponent,
    resolve: {
      productOptionSet: ProductOptionSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductOptionSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductOptionSetUpdateComponent,
    resolve: {
      productOptionSet: ProductOptionSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductOptionSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductOptionSetUpdateComponent,
    resolve: {
      productOptionSet: ProductOptionSetResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductOptionSet.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
