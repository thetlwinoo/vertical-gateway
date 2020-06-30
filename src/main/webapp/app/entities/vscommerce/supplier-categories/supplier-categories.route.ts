import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISupplierCategories, SupplierCategories } from 'app/shared/model/vscommerce/supplier-categories.model';
import { SupplierCategoriesService } from './supplier-categories.service';
import { SupplierCategoriesComponent } from './supplier-categories.component';
import { SupplierCategoriesDetailComponent } from './supplier-categories-detail.component';
import { SupplierCategoriesUpdateComponent } from './supplier-categories-update.component';

@Injectable({ providedIn: 'root' })
export class SupplierCategoriesResolve implements Resolve<ISupplierCategories> {
  constructor(private service: SupplierCategoriesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupplierCategories> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((supplierCategories: HttpResponse<SupplierCategories>) => {
          if (supplierCategories.body) {
            return of(supplierCategories.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SupplierCategories());
  }
}

export const supplierCategoriesRoute: Routes = [
  {
    path: '',
    component: SupplierCategoriesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierCategories.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SupplierCategoriesDetailComponent,
    resolve: {
      supplierCategories: SupplierCategoriesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierCategories.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SupplierCategoriesUpdateComponent,
    resolve: {
      supplierCategories: SupplierCategoriesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierCategories.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SupplierCategoriesUpdateComponent,
    resolve: {
      supplierCategories: SupplierCategoriesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSupplierCategories.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
