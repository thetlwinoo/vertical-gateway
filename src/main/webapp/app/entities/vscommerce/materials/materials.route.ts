import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMaterials, Materials } from 'app/shared/model/vscommerce/materials.model';
import { MaterialsService } from './materials.service';
import { MaterialsComponent } from './materials.component';
import { MaterialsDetailComponent } from './materials-detail.component';
import { MaterialsUpdateComponent } from './materials-update.component';

@Injectable({ providedIn: 'root' })
export class MaterialsResolve implements Resolve<IMaterials> {
  constructor(private service: MaterialsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMaterials> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((materials: HttpResponse<Materials>) => {
          if (materials.body) {
            return of(materials.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Materials());
  }
}

export const materialsRoute: Routes = [
  {
    path: '',
    component: MaterialsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceMaterials.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MaterialsDetailComponent,
    resolve: {
      materials: MaterialsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceMaterials.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MaterialsUpdateComponent,
    resolve: {
      materials: MaterialsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceMaterials.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MaterialsUpdateComponent,
    resolve: {
      materials: MaterialsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceMaterials.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
