import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICustomerCategories, CustomerCategories } from 'app/shared/model/vscommerce/customer-categories.model';
import { CustomerCategoriesService } from './customer-categories.service';
import { CustomerCategoriesComponent } from './customer-categories.component';
import { CustomerCategoriesDetailComponent } from './customer-categories-detail.component';
import { CustomerCategoriesUpdateComponent } from './customer-categories-update.component';

@Injectable({ providedIn: 'root' })
export class CustomerCategoriesResolve implements Resolve<ICustomerCategories> {
  constructor(private service: CustomerCategoriesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerCategories> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((customerCategories: HttpResponse<CustomerCategories>) => {
          if (customerCategories.body) {
            return of(customerCategories.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CustomerCategories());
  }
}

export const customerCategoriesRoute: Routes = [
  {
    path: '',
    component: CustomerCategoriesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerCategories.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CustomerCategoriesDetailComponent,
    resolve: {
      customerCategories: CustomerCategoriesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerCategories.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CustomerCategoriesUpdateComponent,
    resolve: {
      customerCategories: CustomerCategoriesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerCategories.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CustomerCategoriesUpdateComponent,
    resolve: {
      customerCategories: CustomerCategoriesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCustomerCategories.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
