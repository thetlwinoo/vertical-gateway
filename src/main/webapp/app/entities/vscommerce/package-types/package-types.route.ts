import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPackageTypes, PackageTypes } from 'app/shared/model/vscommerce/package-types.model';
import { PackageTypesService } from './package-types.service';
import { PackageTypesComponent } from './package-types.component';
import { PackageTypesDetailComponent } from './package-types-detail.component';
import { PackageTypesUpdateComponent } from './package-types-update.component';

@Injectable({ providedIn: 'root' })
export class PackageTypesResolve implements Resolve<IPackageTypes> {
  constructor(private service: PackageTypesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPackageTypes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((packageTypes: HttpResponse<PackageTypes>) => {
          if (packageTypes.body) {
            return of(packageTypes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PackageTypes());
  }
}

export const packageTypesRoute: Routes = [
  {
    path: '',
    component: PackageTypesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePackageTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PackageTypesDetailComponent,
    resolve: {
      packageTypes: PackageTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePackageTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PackageTypesUpdateComponent,
    resolve: {
      packageTypes: PackageTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePackageTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PackageTypesUpdateComponent,
    resolve: {
      packageTypes: PackageTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePackageTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
