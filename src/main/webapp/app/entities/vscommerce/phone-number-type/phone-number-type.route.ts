import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPhoneNumberType, PhoneNumberType } from 'app/shared/model/vscommerce/phone-number-type.model';
import { PhoneNumberTypeService } from './phone-number-type.service';
import { PhoneNumberTypeComponent } from './phone-number-type.component';
import { PhoneNumberTypeDetailComponent } from './phone-number-type-detail.component';
import { PhoneNumberTypeUpdateComponent } from './phone-number-type-update.component';

@Injectable({ providedIn: 'root' })
export class PhoneNumberTypeResolve implements Resolve<IPhoneNumberType> {
  constructor(private service: PhoneNumberTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPhoneNumberType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((phoneNumberType: HttpResponse<PhoneNumberType>) => {
          if (phoneNumberType.body) {
            return of(phoneNumberType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PhoneNumberType());
  }
}

export const phoneNumberTypeRoute: Routes = [
  {
    path: '',
    component: PhoneNumberTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePhoneNumberType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PhoneNumberTypeDetailComponent,
    resolve: {
      phoneNumberType: PhoneNumberTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePhoneNumberType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PhoneNumberTypeUpdateComponent,
    resolve: {
      phoneNumberType: PhoneNumberTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePhoneNumberType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PhoneNumberTypeUpdateComponent,
    resolve: {
      phoneNumberType: PhoneNumberTypeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePhoneNumberType.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
