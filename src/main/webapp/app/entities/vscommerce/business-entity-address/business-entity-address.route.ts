import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBusinessEntityAddress, BusinessEntityAddress } from 'app/shared/model/vscommerce/business-entity-address.model';
import { BusinessEntityAddressService } from './business-entity-address.service';
import { BusinessEntityAddressComponent } from './business-entity-address.component';
import { BusinessEntityAddressDetailComponent } from './business-entity-address-detail.component';
import { BusinessEntityAddressUpdateComponent } from './business-entity-address-update.component';

@Injectable({ providedIn: 'root' })
export class BusinessEntityAddressResolve implements Resolve<IBusinessEntityAddress> {
  constructor(private service: BusinessEntityAddressService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBusinessEntityAddress> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((businessEntityAddress: HttpResponse<BusinessEntityAddress>) => {
          if (businessEntityAddress.body) {
            return of(businessEntityAddress.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BusinessEntityAddress());
  }
}

export const businessEntityAddressRoute: Routes = [
  {
    path: '',
    component: BusinessEntityAddressComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBusinessEntityAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BusinessEntityAddressDetailComponent,
    resolve: {
      businessEntityAddress: BusinessEntityAddressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBusinessEntityAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BusinessEntityAddressUpdateComponent,
    resolve: {
      businessEntityAddress: BusinessEntityAddressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBusinessEntityAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BusinessEntityAddressUpdateComponent,
    resolve: {
      businessEntityAddress: BusinessEntityAddressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBusinessEntityAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
