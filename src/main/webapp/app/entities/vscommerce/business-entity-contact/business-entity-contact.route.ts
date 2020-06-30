import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBusinessEntityContact, BusinessEntityContact } from 'app/shared/model/vscommerce/business-entity-contact.model';
import { BusinessEntityContactService } from './business-entity-contact.service';
import { BusinessEntityContactComponent } from './business-entity-contact.component';
import { BusinessEntityContactDetailComponent } from './business-entity-contact-detail.component';
import { BusinessEntityContactUpdateComponent } from './business-entity-contact-update.component';

@Injectable({ providedIn: 'root' })
export class BusinessEntityContactResolve implements Resolve<IBusinessEntityContact> {
  constructor(private service: BusinessEntityContactService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBusinessEntityContact> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((businessEntityContact: HttpResponse<BusinessEntityContact>) => {
          if (businessEntityContact.body) {
            return of(businessEntityContact.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BusinessEntityContact());
  }
}

export const businessEntityContactRoute: Routes = [
  {
    path: '',
    component: BusinessEntityContactComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBusinessEntityContact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BusinessEntityContactDetailComponent,
    resolve: {
      businessEntityContact: BusinessEntityContactResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBusinessEntityContact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BusinessEntityContactUpdateComponent,
    resolve: {
      businessEntityContact: BusinessEntityContactResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBusinessEntityContact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BusinessEntityContactUpdateComponent,
    resolve: {
      businessEntityContact: BusinessEntityContactResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBusinessEntityContact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
