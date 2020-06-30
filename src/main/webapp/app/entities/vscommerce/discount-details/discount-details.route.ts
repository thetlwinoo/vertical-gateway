import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiscountDetails, DiscountDetails } from 'app/shared/model/vscommerce/discount-details.model';
import { DiscountDetailsService } from './discount-details.service';
import { DiscountDetailsComponent } from './discount-details.component';
import { DiscountDetailsDetailComponent } from './discount-details-detail.component';
import { DiscountDetailsUpdateComponent } from './discount-details-update.component';

@Injectable({ providedIn: 'root' })
export class DiscountDetailsResolve implements Resolve<IDiscountDetails> {
  constructor(private service: DiscountDetailsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiscountDetails> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((discountDetails: HttpResponse<DiscountDetails>) => {
          if (discountDetails.body) {
            return of(discountDetails.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DiscountDetails());
  }
}

export const discountDetailsRoute: Routes = [
  {
    path: '',
    component: DiscountDetailsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDiscountDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiscountDetailsDetailComponent,
    resolve: {
      discountDetails: DiscountDetailsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDiscountDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiscountDetailsUpdateComponent,
    resolve: {
      discountDetails: DiscountDetailsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDiscountDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiscountDetailsUpdateComponent,
    resolve: {
      discountDetails: DiscountDetailsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDiscountDetails.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
