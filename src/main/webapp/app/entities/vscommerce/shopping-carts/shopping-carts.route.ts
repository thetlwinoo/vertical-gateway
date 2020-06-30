import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IShoppingCarts, ShoppingCarts } from 'app/shared/model/vscommerce/shopping-carts.model';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsComponent } from './shopping-carts.component';
import { ShoppingCartsDetailComponent } from './shopping-carts-detail.component';
import { ShoppingCartsUpdateComponent } from './shopping-carts-update.component';

@Injectable({ providedIn: 'root' })
export class ShoppingCartsResolve implements Resolve<IShoppingCarts> {
  constructor(private service: ShoppingCartsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShoppingCarts> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((shoppingCarts: HttpResponse<ShoppingCarts>) => {
          if (shoppingCarts.body) {
            return of(shoppingCarts.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ShoppingCarts());
  }
}

export const shoppingCartsRoute: Routes = [
  {
    path: '',
    component: ShoppingCartsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShoppingCarts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShoppingCartsDetailComponent,
    resolve: {
      shoppingCarts: ShoppingCartsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShoppingCarts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShoppingCartsUpdateComponent,
    resolve: {
      shoppingCarts: ShoppingCartsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShoppingCarts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShoppingCartsUpdateComponent,
    resolve: {
      shoppingCarts: ShoppingCartsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShoppingCarts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
