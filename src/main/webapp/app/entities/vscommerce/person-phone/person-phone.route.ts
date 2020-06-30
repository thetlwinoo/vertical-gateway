import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPersonPhone, PersonPhone } from 'app/shared/model/vscommerce/person-phone.model';
import { PersonPhoneService } from './person-phone.service';
import { PersonPhoneComponent } from './person-phone.component';
import { PersonPhoneDetailComponent } from './person-phone-detail.component';
import { PersonPhoneUpdateComponent } from './person-phone-update.component';

@Injectable({ providedIn: 'root' })
export class PersonPhoneResolve implements Resolve<IPersonPhone> {
  constructor(private service: PersonPhoneService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonPhone> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((personPhone: HttpResponse<PersonPhone>) => {
          if (personPhone.body) {
            return of(personPhone.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PersonPhone());
  }
}

export const personPhoneRoute: Routes = [
  {
    path: '',
    component: PersonPhoneComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePersonPhone.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersonPhoneDetailComponent,
    resolve: {
      personPhone: PersonPhoneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePersonPhone.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PersonPhoneUpdateComponent,
    resolve: {
      personPhone: PersonPhoneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePersonPhone.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PersonPhoneUpdateComponent,
    resolve: {
      personPhone: PersonPhoneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePersonPhone.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
