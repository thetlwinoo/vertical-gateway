import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductTags, ProductTags } from 'app/shared/model/vscommerce/product-tags.model';
import { ProductTagsService } from './product-tags.service';
import { ProductTagsComponent } from './product-tags.component';
import { ProductTagsDetailComponent } from './product-tags-detail.component';
import { ProductTagsUpdateComponent } from './product-tags-update.component';

@Injectable({ providedIn: 'root' })
export class ProductTagsResolve implements Resolve<IProductTags> {
  constructor(private service: ProductTagsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductTags> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productTags: HttpResponse<ProductTags>) => {
          if (productTags.body) {
            return of(productTags.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductTags());
  }
}

export const productTagsRoute: Routes = [
  {
    path: '',
    component: ProductTagsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductTags.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductTagsDetailComponent,
    resolve: {
      productTags: ProductTagsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductTags.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductTagsUpdateComponent,
    resolve: {
      productTags: ProductTagsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductTags.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductTagsUpdateComponent,
    resolve: {
      productTags: ProductTagsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductTags.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
