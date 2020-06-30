import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductSetDetails, ProductSetDetails } from 'app/shared/model/vscommerce/product-set-details.model';
import { ProductSetDetailsService } from './product-set-details.service';
import { ProductSetDetailsComponent } from './product-set-details.component';
import { ProductSetDetailsDetailComponent } from './product-set-details-detail.component';
import { ProductSetDetailsUpdateComponent } from './product-set-details-update.component';

@Injectable({ providedIn: 'root' })
export class ProductSetDetailsResolve implements Resolve<IProductSetDetails> {
  constructor(private service: ProductSetDetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductSetDetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productSetDetails: HttpResponse<ProductSetDetails>) => {
          if (productSetDetails.body) {
            return of(productSetDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductSetDetails());
  }
}

export const productSetDetailsRoute: Routes = [
  {
    path: '',
    component: ProductSetDetailsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductSetDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductSetDetailsDetailComponent,
    resolve: {
      productSetDetails: ProductSetDetailsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductSetDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductSetDetailsUpdateComponent,
    resolve: {
      productSetDetails: ProductSetDetailsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductSetDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductSetDetailsUpdateComponent,
    resolve: {
      productSetDetails: ProductSetDetailsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductSetDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
