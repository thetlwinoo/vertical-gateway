import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPhotos, Photos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from './photos.service';
import { PhotosComponent } from './photos.component';
import { PhotosDetailComponent } from './photos-detail.component';
import { PhotosUpdateComponent } from './photos-update.component';

@Injectable({ providedIn: 'root' })
export class PhotosResolve implements Resolve<IPhotos> {
  constructor(private service: PhotosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPhotos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((photos: HttpResponse<Photos>) => {
          if (photos.body) {
            return of(photos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Photos());
  }
}

export const photosRoute: Routes = [
  {
    path: '',
    component: PhotosComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePhotos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PhotosDetailComponent,
    resolve: {
      photos: PhotosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePhotos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PhotosUpdateComponent,
    resolve: {
      photos: PhotosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePhotos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PhotosUpdateComponent,
    resolve: {
      photos: PhotosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePhotos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
