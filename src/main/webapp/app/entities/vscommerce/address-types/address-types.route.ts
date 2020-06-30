import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAddressTypes, AddressTypes } from 'app/shared/model/vscommerce/address-types.model';
import { AddressTypesService } from './address-types.service';
import { AddressTypesComponent } from './address-types.component';
import { AddressTypesDetailComponent } from './address-types-detail.component';
import { AddressTypesUpdateComponent } from './address-types-update.component';

@Injectable({ providedIn: 'root' })
export class AddressTypesResolve implements Resolve<IAddressTypes> {
  constructor(private service: AddressTypesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAddressTypes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((addressTypes: HttpResponse<AddressTypes>) => {
          if (addressTypes.body) {
            return of(addressTypes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AddressTypes());
  }
}

export const addressTypesRoute: Routes = [
  {
    path: '',
    component: AddressTypesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceAddressTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AddressTypesDetailComponent,
    resolve: {
      addressTypes: AddressTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceAddressTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AddressTypesUpdateComponent,
    resolve: {
      addressTypes: AddressTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceAddressTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AddressTypesUpdateComponent,
    resolve: {
      addressTypes: AddressTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceAddressTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
