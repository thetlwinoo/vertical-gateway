import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductChoice, ProductChoice } from 'app/shared/model/vscommerce/product-choice.model';
import { ProductChoiceService } from './product-choice.service';
import { ProductChoiceComponent } from './product-choice.component';
import { ProductChoiceDetailComponent } from './product-choice-detail.component';
import { ProductChoiceUpdateComponent } from './product-choice-update.component';

@Injectable({ providedIn: 'root' })
export class ProductChoiceResolve implements Resolve<IProductChoice> {
  constructor(private service: ProductChoiceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductChoice> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productChoice: HttpResponse<ProductChoice>) => {
          if (productChoice.body) {
            return of(productChoice.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductChoice());
  }
}

export const productChoiceRoute: Routes = [
  {
    path: '',
    component: ProductChoiceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductChoice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductChoiceDetailComponent,
    resolve: {
      productChoice: ProductChoiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductChoice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductChoiceUpdateComponent,
    resolve: {
      productChoice: ProductChoiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductChoice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductChoiceUpdateComponent,
    resolve: {
      productChoice: ProductChoiceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceProductChoice.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
