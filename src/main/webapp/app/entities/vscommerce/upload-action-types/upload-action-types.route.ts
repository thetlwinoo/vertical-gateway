import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IUploadActionTypes, UploadActionTypes } from 'app/shared/model/vscommerce/upload-action-types.model';
import { UploadActionTypesService } from './upload-action-types.service';
import { UploadActionTypesComponent } from './upload-action-types.component';
import { UploadActionTypesDetailComponent } from './upload-action-types-detail.component';
import { UploadActionTypesUpdateComponent } from './upload-action-types-update.component';

@Injectable({ providedIn: 'root' })
export class UploadActionTypesResolve implements Resolve<IUploadActionTypes> {
  constructor(private service: UploadActionTypesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUploadActionTypes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((uploadActionTypes: HttpResponse<UploadActionTypes>) => {
          if (uploadActionTypes.body) {
            return of(uploadActionTypes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new UploadActionTypes());
  }
}

export const uploadActionTypesRoute: Routes = [
  {
    path: '',
    component: UploadActionTypesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUploadActionTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UploadActionTypesDetailComponent,
    resolve: {
      uploadActionTypes: UploadActionTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUploadActionTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UploadActionTypesUpdateComponent,
    resolve: {
      uploadActionTypes: UploadActionTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUploadActionTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UploadActionTypesUpdateComponent,
    resolve: {
      uploadActionTypes: UploadActionTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceUploadActionTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
