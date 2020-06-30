import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStateProvinces, StateProvinces } from 'app/shared/model/vscommerce/state-provinces.model';
import { StateProvincesService } from './state-provinces.service';
import { StateProvincesComponent } from './state-provinces.component';
import { StateProvincesDetailComponent } from './state-provinces-detail.component';
import { StateProvincesUpdateComponent } from './state-provinces-update.component';

@Injectable({ providedIn: 'root' })
export class StateProvincesResolve implements Resolve<IStateProvinces> {
  constructor(private service: StateProvincesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStateProvinces> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((stateProvinces: HttpResponse<StateProvinces>) => {
          if (stateProvinces.body) {
            return of(stateProvinces.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StateProvinces());
  }
}

export const stateProvincesRoute: Routes = [
  {
    path: '',
    component: StateProvincesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStateProvinces.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StateProvincesDetailComponent,
    resolve: {
      stateProvinces: StateProvincesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStateProvinces.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StateProvincesUpdateComponent,
    resolve: {
      stateProvinces: StateProvincesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStateProvinces.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StateProvincesUpdateComponent,
    resolve: {
      stateProvinces: StateProvincesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceStateProvinces.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
