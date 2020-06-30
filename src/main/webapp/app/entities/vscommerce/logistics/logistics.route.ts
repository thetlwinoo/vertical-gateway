import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILogistics, Logistics } from 'app/shared/model/vscommerce/logistics.model';
import { LogisticsService } from './logistics.service';
import { LogisticsComponent } from './logistics.component';
import { LogisticsDetailComponent } from './logistics-detail.component';
import { LogisticsUpdateComponent } from './logistics-update.component';

@Injectable({ providedIn: 'root' })
export class LogisticsResolve implements Resolve<ILogistics> {
  constructor(private service: LogisticsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILogistics> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((logistics: HttpResponse<Logistics>) => {
          if (logistics.body) {
            return of(logistics.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Logistics());
  }
}

export const logisticsRoute: Routes = [
  {
    path: '',
    component: LogisticsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceLogistics.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LogisticsDetailComponent,
    resolve: {
      logistics: LogisticsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceLogistics.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LogisticsUpdateComponent,
    resolve: {
      logistics: LogisticsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceLogistics.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LogisticsUpdateComponent,
    resolve: {
      logistics: LogisticsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceLogistics.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
