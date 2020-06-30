import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IShipMethod, ShipMethod } from 'app/shared/model/vscommerce/ship-method.model';
import { ShipMethodService } from './ship-method.service';
import { ShipMethodComponent } from './ship-method.component';
import { ShipMethodDetailComponent } from './ship-method-detail.component';
import { ShipMethodUpdateComponent } from './ship-method-update.component';

@Injectable({ providedIn: 'root' })
export class ShipMethodResolve implements Resolve<IShipMethod> {
  constructor(private service: ShipMethodService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShipMethod> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((shipMethod: HttpResponse<ShipMethod>) => {
          if (shipMethod.body) {
            return of(shipMethod.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ShipMethod());
  }
}

export const shipMethodRoute: Routes = [
  {
    path: '',
    component: ShipMethodComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShipMethod.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShipMethodDetailComponent,
    resolve: {
      shipMethod: ShipMethodResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShipMethod.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShipMethodUpdateComponent,
    resolve: {
      shipMethod: ShipMethodResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShipMethod.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShipMethodUpdateComponent,
    resolve: {
      shipMethod: ShipMethodResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceShipMethod.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
