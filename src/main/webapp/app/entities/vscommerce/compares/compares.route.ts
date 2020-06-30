import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICompares, Compares } from 'app/shared/model/vscommerce/compares.model';
import { ComparesService } from './compares.service';
import { ComparesComponent } from './compares.component';
import { ComparesDetailComponent } from './compares-detail.component';
import { ComparesUpdateComponent } from './compares-update.component';

@Injectable({ providedIn: 'root' })
export class ComparesResolve implements Resolve<ICompares> {
  constructor(private service: ComparesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICompares> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((compares: HttpResponse<Compares>) => {
          if (compares.body) {
            return of(compares.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Compares());
  }
}

export const comparesRoute: Routes = [
  {
    path: '',
    component: ComparesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCompares.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ComparesDetailComponent,
    resolve: {
      compares: ComparesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCompares.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ComparesUpdateComponent,
    resolve: {
      compares: ComparesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCompares.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ComparesUpdateComponent,
    resolve: {
      compares: ComparesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCompares.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
