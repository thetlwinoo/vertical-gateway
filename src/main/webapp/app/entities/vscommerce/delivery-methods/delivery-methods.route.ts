import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDeliveryMethods, DeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';
import { DeliveryMethodsService } from './delivery-methods.service';
import { DeliveryMethodsComponent } from './delivery-methods.component';
import { DeliveryMethodsDetailComponent } from './delivery-methods-detail.component';
import { DeliveryMethodsUpdateComponent } from './delivery-methods-update.component';

@Injectable({ providedIn: 'root' })
export class DeliveryMethodsResolve implements Resolve<IDeliveryMethods> {
  constructor(private service: DeliveryMethodsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDeliveryMethods> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((deliveryMethods: HttpResponse<DeliveryMethods>) => {
          if (deliveryMethods.body) {
            return of(deliveryMethods.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DeliveryMethods());
  }
}

export const deliveryMethodsRoute: Routes = [
  {
    path: '',
    component: DeliveryMethodsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDeliveryMethods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DeliveryMethodsDetailComponent,
    resolve: {
      deliveryMethods: DeliveryMethodsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDeliveryMethods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DeliveryMethodsUpdateComponent,
    resolve: {
      deliveryMethods: DeliveryMethodsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDeliveryMethods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DeliveryMethodsUpdateComponent,
    resolve: {
      deliveryMethods: DeliveryMethodsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceDeliveryMethods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
