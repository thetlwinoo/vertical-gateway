import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISpecialDeals, SpecialDeals } from 'app/shared/model/vscommerce/special-deals.model';
import { SpecialDealsService } from './special-deals.service';
import { SpecialDealsComponent } from './special-deals.component';
import { SpecialDealsDetailComponent } from './special-deals-detail.component';
import { SpecialDealsUpdateComponent } from './special-deals-update.component';

@Injectable({ providedIn: 'root' })
export class SpecialDealsResolve implements Resolve<ISpecialDeals> {
  constructor(private service: SpecialDealsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpecialDeals> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((specialDeals: HttpResponse<SpecialDeals>) => {
          if (specialDeals.body) {
            return of(specialDeals.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SpecialDeals());
  }
}

export const specialDealsRoute: Routes = [
  {
    path: '',
    component: SpecialDealsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSpecialDeals.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SpecialDealsDetailComponent,
    resolve: {
      specialDeals: SpecialDealsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSpecialDeals.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SpecialDealsUpdateComponent,
    resolve: {
      specialDeals: SpecialDealsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSpecialDeals.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SpecialDealsUpdateComponent,
    resolve: {
      specialDeals: SpecialDealsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSpecialDeals.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
