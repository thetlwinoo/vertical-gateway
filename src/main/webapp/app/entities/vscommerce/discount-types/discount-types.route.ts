import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiscountTypes, DiscountTypes } from 'app/shared/model/vscommerce/discount-types.model';
import { DiscountTypesService } from './discount-types.service';
import { DiscountTypesComponent } from './discount-types.component';
import { DiscountTypesDetailComponent } from './discount-types-detail.component';
import { DiscountTypesUpdateComponent } from './discount-types-update.component';

@Injectable({ providedIn: 'root' })
export class DiscountTypesResolve implements Resolve<IDiscountTypes> {
  constructor(private service: DiscountTypesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiscountTypes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((discountTypes: HttpResponse<DiscountTypes>) => {
          if (discountTypes.body) {
            return of(discountTypes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DiscountTypes());
  }
}

export const discountTypesRoute: Routes = [
  {
    path: '',
    component: DiscountTypesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDiscountTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiscountTypesDetailComponent,
    resolve: {
      discountTypes: DiscountTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDiscountTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiscountTypesUpdateComponent,
    resolve: {
      discountTypes: DiscountTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDiscountTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiscountTypesUpdateComponent,
    resolve: {
      discountTypes: DiscountTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDiscountTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
