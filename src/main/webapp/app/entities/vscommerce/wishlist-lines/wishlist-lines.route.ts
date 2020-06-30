import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWishlistLines, WishlistLines } from 'app/shared/model/vscommerce/wishlist-lines.model';
import { WishlistLinesService } from './wishlist-lines.service';
import { WishlistLinesComponent } from './wishlist-lines.component';
import { WishlistLinesDetailComponent } from './wishlist-lines-detail.component';
import { WishlistLinesUpdateComponent } from './wishlist-lines-update.component';

@Injectable({ providedIn: 'root' })
export class WishlistLinesResolve implements Resolve<IWishlistLines> {
  constructor(private service: WishlistLinesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWishlistLines> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((wishlistLines: HttpResponse<WishlistLines>) => {
          if (wishlistLines.body) {
            return of(wishlistLines.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WishlistLines());
  }
}

export const wishlistLinesRoute: Routes = [
  {
    path: '',
    component: WishlistLinesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWishlistLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WishlistLinesDetailComponent,
    resolve: {
      wishlistLines: WishlistLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWishlistLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WishlistLinesUpdateComponent,
    resolve: {
      wishlistLines: WishlistLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWishlistLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WishlistLinesUpdateComponent,
    resolve: {
      wishlistLines: WishlistLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWishlistLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
