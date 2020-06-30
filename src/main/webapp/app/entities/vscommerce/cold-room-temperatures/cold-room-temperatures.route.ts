import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IColdRoomTemperatures, ColdRoomTemperatures } from 'app/shared/model/vscommerce/cold-room-temperatures.model';
import { ColdRoomTemperaturesService } from './cold-room-temperatures.service';
import { ColdRoomTemperaturesComponent } from './cold-room-temperatures.component';
import { ColdRoomTemperaturesDetailComponent } from './cold-room-temperatures-detail.component';
import { ColdRoomTemperaturesUpdateComponent } from './cold-room-temperatures-update.component';

@Injectable({ providedIn: 'root' })
export class ColdRoomTemperaturesResolve implements Resolve<IColdRoomTemperatures> {
  constructor(private service: ColdRoomTemperaturesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IColdRoomTemperatures> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((coldRoomTemperatures: HttpResponse<ColdRoomTemperatures>) => {
          if (coldRoomTemperatures.body) {
            return of(coldRoomTemperatures.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ColdRoomTemperatures());
  }
}

export const coldRoomTemperaturesRoute: Routes = [
  {
    path: '',
    component: ColdRoomTemperaturesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceColdRoomTemperatures.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ColdRoomTemperaturesDetailComponent,
    resolve: {
      coldRoomTemperatures: ColdRoomTemperaturesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceColdRoomTemperatures.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ColdRoomTemperaturesUpdateComponent,
    resolve: {
      coldRoomTemperatures: ColdRoomTemperaturesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceColdRoomTemperatures.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ColdRoomTemperaturesUpdateComponent,
    resolve: {
      coldRoomTemperatures: ColdRoomTemperaturesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceColdRoomTemperatures.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
