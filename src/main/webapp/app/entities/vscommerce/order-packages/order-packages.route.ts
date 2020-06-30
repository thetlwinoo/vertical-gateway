import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOrderPackages, OrderPackages } from 'app/shared/model/vscommerce/order-packages.model';
import { OrderPackagesService } from './order-packages.service';
import { OrderPackagesComponent } from './order-packages.component';
import { OrderPackagesDetailComponent } from './order-packages-detail.component';
import { OrderPackagesUpdateComponent } from './order-packages-update.component';

@Injectable({ providedIn: 'root' })
export class OrderPackagesResolve implements Resolve<IOrderPackages> {
  constructor(private service: OrderPackagesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrderPackages> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((orderPackages: HttpResponse<OrderPackages>) => {
          if (orderPackages.body) {
            return of(orderPackages.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrderPackages());
  }
}

export const orderPackagesRoute: Routes = [
  {
    path: '',
    component: OrderPackagesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderPackages.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrderPackagesDetailComponent,
    resolve: {
      orderPackages: OrderPackagesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderPackages.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrderPackagesUpdateComponent,
    resolve: {
      orderPackages: OrderPackagesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderPackages.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrderPackagesUpdateComponent,
    resolve: {
      orderPackages: OrderPackagesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceOrderPackages.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
