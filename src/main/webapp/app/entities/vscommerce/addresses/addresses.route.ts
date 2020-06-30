import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAddresses, Addresses } from 'app/shared/model/vscommerce/addresses.model';
import { AddressesService } from './addresses.service';
import { AddressesComponent } from './addresses.component';
import { AddressesDetailComponent } from './addresses-detail.component';
import { AddressesUpdateComponent } from './addresses-update.component';

@Injectable({ providedIn: 'root' })
export class AddressesResolve implements Resolve<IAddresses> {
  constructor(private service: AddressesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAddresses> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((addresses: HttpResponse<Addresses>) => {
          if (addresses.body) {
            return of(addresses.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Addresses());
  }
}

export const addressesRoute: Routes = [
  {
    path: '',
    component: AddressesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceAddresses.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AddressesDetailComponent,
    resolve: {
      addresses: AddressesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceAddresses.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AddressesUpdateComponent,
    resolve: {
      addresses: AddressesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceAddresses.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AddressesUpdateComponent,
    resolve: {
      addresses: AddressesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceAddresses.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
