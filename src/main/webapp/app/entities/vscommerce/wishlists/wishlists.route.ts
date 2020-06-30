import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWishlists, Wishlists } from 'app/shared/model/vscommerce/wishlists.model';
import { WishlistsService } from './wishlists.service';
import { WishlistsComponent } from './wishlists.component';
import { WishlistsDetailComponent } from './wishlists-detail.component';
import { WishlistsUpdateComponent } from './wishlists-update.component';

@Injectable({ providedIn: 'root' })
export class WishlistsResolve implements Resolve<IWishlists> {
  constructor(private service: WishlistsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWishlists> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((wishlists: HttpResponse<Wishlists>) => {
          if (wishlists.body) {
            return of(wishlists.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Wishlists());
  }
}

export const wishlistsRoute: Routes = [
  {
    path: '',
    component: WishlistsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWishlists.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WishlistsDetailComponent,
    resolve: {
      wishlists: WishlistsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWishlists.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WishlistsUpdateComponent,
    resolve: {
      wishlists: WishlistsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWishlists.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WishlistsUpdateComponent,
    resolve: {
      wishlists: WishlistsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWishlists.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
