import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUnitMeasure, UnitMeasure } from 'app/shared/model/vscommerce/unit-measure.model';
import { UnitMeasureService } from './unit-measure.service';
import { UnitMeasureComponent } from './unit-measure.component';
import { UnitMeasureDetailComponent } from './unit-measure-detail.component';
import { UnitMeasureUpdateComponent } from './unit-measure-update.component';

@Injectable({ providedIn: 'root' })
export class UnitMeasureResolve implements Resolve<IUnitMeasure> {
  constructor(private service: UnitMeasureService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUnitMeasure> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((unitMeasure: HttpResponse<UnitMeasure>) => {
          if (unitMeasure.body) {
            return of(unitMeasure.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UnitMeasure());
  }
}

export const unitMeasureRoute: Routes = [
  {
    path: '',
    component: UnitMeasureComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUnitMeasure.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UnitMeasureDetailComponent,
    resolve: {
      unitMeasure: UnitMeasureResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUnitMeasure.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UnitMeasureUpdateComponent,
    resolve: {
      unitMeasure: UnitMeasureResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUnitMeasure.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UnitMeasureUpdateComponent,
    resolve: {
      unitMeasure: UnitMeasureResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUnitMeasure.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
