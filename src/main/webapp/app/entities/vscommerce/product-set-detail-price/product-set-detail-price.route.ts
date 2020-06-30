import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductSetDetailPrice, ProductSetDetailPrice } from 'app/shared/model/vscommerce/product-set-detail-price.model';
import { ProductSetDetailPriceService } from './product-set-detail-price.service';
import { ProductSetDetailPriceComponent } from './product-set-detail-price.component';
import { ProductSetDetailPriceDetailComponent } from './product-set-detail-price-detail.component';
import { ProductSetDetailPriceUpdateComponent } from './product-set-detail-price-update.component';

@Injectable({ providedIn: 'root' })
export class ProductSetDetailPriceResolve implements Resolve<IProductSetDetailPrice> {
  constructor(private service: ProductSetDetailPriceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductSetDetailPrice> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productSetDetailPrice: HttpResponse<ProductSetDetailPrice>) => {
          if (productSetDetailPrice.body) {
            return of(productSetDetailPrice.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductSetDetailPrice());
  }
}

export const productSetDetailPriceRoute: Routes = [
  {
    path: '',
    component: ProductSetDetailPriceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductSetDetailPrice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductSetDetailPriceDetailComponent,
    resolve: {
      productSetDetailPrice: ProductSetDetailPriceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductSetDetailPrice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductSetDetailPriceUpdateComponent,
    resolve: {
      productSetDetailPrice: ProductSetDetailPriceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductSetDetailPrice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductSetDetailPriceUpdateComponent,
    resolve: {
      productSetDetailPrice: ProductSetDetailPriceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductSetDetailPrice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
