import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISystemParameters, SystemParameters } from 'app/shared/model/vscommerce/system-parameters.model';
import { SystemParametersService } from './system-parameters.service';
import { SystemParametersComponent } from './system-parameters.component';
import { SystemParametersDetailComponent } from './system-parameters-detail.component';
import { SystemParametersUpdateComponent } from './system-parameters-update.component';

@Injectable({ providedIn: 'root' })
export class SystemParametersResolve implements Resolve<ISystemParameters> {
  constructor(private service: SystemParametersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISystemParameters> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((systemParameters: HttpResponse<SystemParameters>) => {
          if (systemParameters.body) {
            return of(systemParameters.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SystemParameters());
  }
}

export const systemParametersRoute: Routes = [
  {
    path: '',
    component: SystemParametersComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSystemParameters.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SystemParametersDetailComponent,
    resolve: {
      systemParameters: SystemParametersResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSystemParameters.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SystemParametersUpdateComponent,
    resolve: {
      systemParameters: SystemParametersResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSystemParameters.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SystemParametersUpdateComponent,
    resolve: {
      systemParameters: SystemParametersResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSystemParameters.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
