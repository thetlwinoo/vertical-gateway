import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductOption, ProductOption } from 'app/shared/model/vscommerce/product-option.model';
import { ProductOptionService } from './product-option.service';
import { ProductOptionComponent } from './product-option.component';
import { ProductOptionDetailComponent } from './product-option-detail.component';
import { ProductOptionUpdateComponent } from './product-option-update.component';

@Injectable({ providedIn: 'root' })
export class ProductOptionResolve implements Resolve<IProductOption> {
  constructor(private service: ProductOptionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductOption> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productOption: HttpResponse<ProductOption>) => {
          if (productOption.body) {
            return of(productOption.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductOption());
  }
}

export const productOptionRoute: Routes = [
  {
    path: '',
    component: ProductOptionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductOption.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductOptionDetailComponent,
    resolve: {
      productOption: ProductOptionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductOption.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductOptionUpdateComponent,
    resolve: {
      productOption: ProductOptionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductOption.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductOptionUpdateComponent,
    resolve: {
      productOption: ProductOptionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductOption.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
