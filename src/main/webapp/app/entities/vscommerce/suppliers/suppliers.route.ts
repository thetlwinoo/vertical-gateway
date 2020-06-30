import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISuppliers, Suppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from './suppliers.service';
import { SuppliersComponent } from './suppliers.component';
import { SuppliersDetailComponent } from './suppliers-detail.component';
import { SuppliersUpdateComponent } from './suppliers-update.component';

@Injectable({ providedIn: 'root' })
export class SuppliersResolve implements Resolve<ISuppliers> {
  constructor(private service: SuppliersService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISuppliers> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((suppliers: HttpResponse<Suppliers>) => {
          if (suppliers.body) {
            return of(suppliers.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Suppliers());
  }
}

export const suppliersRoute: Routes = [
  {
    path: '',
    component: SuppliersComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSuppliers.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SuppliersDetailComponent,
    resolve: {
      suppliers: SuppliersResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSuppliers.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SuppliersUpdateComponent,
    resolve: {
      suppliers: SuppliersResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSuppliers.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SuppliersUpdateComponent,
    resolve: {
      suppliers: SuppliersResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceSuppliers.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
