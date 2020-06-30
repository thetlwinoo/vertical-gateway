import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICountries, Countries } from 'app/shared/model/vscommerce/countries.model';
import { CountriesService } from './countries.service';
import { CountriesComponent } from './countries.component';
import { CountriesDetailComponent } from './countries-detail.component';
import { CountriesUpdateComponent } from './countries-update.component';

@Injectable({ providedIn: 'root' })
export class CountriesResolve implements Resolve<ICountries> {
  constructor(private service: CountriesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICountries> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((countries: HttpResponse<Countries>) => {
          if (countries.body) {
            return of(countries.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Countries());
  }
}

export const countriesRoute: Routes = [
  {
    path: '',
    component: CountriesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCountries.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CountriesDetailComponent,
    resolve: {
      countries: CountriesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCountries.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CountriesUpdateComponent,
    resolve: {
      countries: CountriesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCountries.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CountriesUpdateComponent,
    resolve: {
      countries: CountriesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCountries.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
