import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IShoppingCartItems, ShoppingCartItems } from 'app/shared/model/vscommerce/shopping-cart-items.model';
import { ShoppingCartItemsService } from './shopping-cart-items.service';
import { ShoppingCartItemsComponent } from './shopping-cart-items.component';
import { ShoppingCartItemsDetailComponent } from './shopping-cart-items-detail.component';
import { ShoppingCartItemsUpdateComponent } from './shopping-cart-items-update.component';

@Injectable({ providedIn: 'root' })
export class ShoppingCartItemsResolve implements Resolve<IShoppingCartItems> {
  constructor(private service: ShoppingCartItemsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShoppingCartItems> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((shoppingCartItems: HttpResponse<ShoppingCartItems>) => {
          if (shoppingCartItems.body) {
            return of(shoppingCartItems.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ShoppingCartItems());
  }
}

export const shoppingCartItemsRoute: Routes = [
  {
    path: '',
    component: ShoppingCartItemsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShoppingCartItems.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShoppingCartItemsDetailComponent,
    resolve: {
      shoppingCartItems: ShoppingCartItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShoppingCartItems.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShoppingCartItemsUpdateComponent,
    resolve: {
      shoppingCartItems: ShoppingCartItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShoppingCartItems.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShoppingCartItemsUpdateComponent,
    resolve: {
      shoppingCartItems: ShoppingCartItemsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShoppingCartItems.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
