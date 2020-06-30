import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPersonEmailAddress, PersonEmailAddress } from 'app/shared/model/vscommerce/person-email-address.model';
import { PersonEmailAddressService } from './person-email-address.service';
import { PersonEmailAddressComponent } from './person-email-address.component';
import { PersonEmailAddressDetailComponent } from './person-email-address-detail.component';
import { PersonEmailAddressUpdateComponent } from './person-email-address-update.component';

@Injectable({ providedIn: 'root' })
export class PersonEmailAddressResolve implements Resolve<IPersonEmailAddress> {
  constructor(private service: PersonEmailAddressService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonEmailAddress> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((personEmailAddress: HttpResponse<PersonEmailAddress>) => {
          if (personEmailAddress.body) {
            return of(personEmailAddress.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PersonEmailAddress());
  }
}

export const personEmailAddressRoute: Routes = [
  {
    path: '',
    component: PersonEmailAddressComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePersonEmailAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersonEmailAddressDetailComponent,
    resolve: {
      personEmailAddress: PersonEmailAddressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePersonEmailAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PersonEmailAddressUpdateComponent,
    resolve: {
      personEmailAddress: PersonEmailAddressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePersonEmailAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PersonEmailAddressUpdateComponent,
    resolve: {
      personEmailAddress: PersonEmailAddressResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePersonEmailAddress.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
