import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IWarrantyTypes, WarrantyTypes } from 'app/shared/model/vscommerce/warranty-types.model';
import { WarrantyTypesService } from './warranty-types.service';
import { WarrantyTypesComponent } from './warranty-types.component';
import { WarrantyTypesDetailComponent } from './warranty-types-detail.component';
import { WarrantyTypesUpdateComponent } from './warranty-types-update.component';

@Injectable({ providedIn: 'root' })
export class WarrantyTypesResolve implements Resolve<IWarrantyTypes> {
  constructor(private service: WarrantyTypesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWarrantyTypes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((warrantyTypes: HttpResponse<WarrantyTypes>) => {
          if (warrantyTypes.body) {
            return of(warrantyTypes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new WarrantyTypes());
  }
}

export const warrantyTypesRoute: Routes = [
  {
    path: '',
    component: WarrantyTypesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWarrantyTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: WarrantyTypesDetailComponent,
    resolve: {
      warrantyTypes: WarrantyTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWarrantyTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: WarrantyTypesUpdateComponent,
    resolve: {
      warrantyTypes: WarrantyTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWarrantyTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: WarrantyTypesUpdateComponent,
    resolve: {
      warrantyTypes: WarrantyTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceWarrantyTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
