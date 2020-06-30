import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICities, Cities } from 'app/shared/model/vscommerce/cities.model';
import { CitiesService } from './cities.service';
import { CitiesComponent } from './cities.component';
import { CitiesDetailComponent } from './cities-detail.component';
import { CitiesUpdateComponent } from './cities-update.component';

@Injectable({ providedIn: 'root' })
export class CitiesResolve implements Resolve<ICities> {
  constructor(private service: CitiesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICities> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cities: HttpResponse<Cities>) => {
          if (cities.body) {
            return of(cities.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Cities());
  }
}

export const citiesRoute: Routes = [
  {
    path: '',
    component: CitiesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCities.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CitiesDetailComponent,
    resolve: {
      cities: CitiesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCities.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CitiesUpdateComponent,
    resolve: {
      cities: CitiesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCities.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CitiesUpdateComponent,
    resolve: {
      cities: CitiesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCities.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
