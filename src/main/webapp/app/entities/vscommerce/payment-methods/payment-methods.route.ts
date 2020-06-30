import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPaymentMethods, PaymentMethods } from 'app/shared/model/vscommerce/payment-methods.model';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethodsComponent } from './payment-methods.component';
import { PaymentMethodsDetailComponent } from './payment-methods-detail.component';
import { PaymentMethodsUpdateComponent } from './payment-methods-update.component';

@Injectable({ providedIn: 'root' })
export class PaymentMethodsResolve implements Resolve<IPaymentMethods> {
  constructor(private service: PaymentMethodsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPaymentMethods> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((paymentMethods: HttpResponse<PaymentMethods>) => {
          if (paymentMethods.body) {
            return of(paymentMethods.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PaymentMethods());
  }
}

export const paymentMethodsRoute: Routes = [
  {
    path: '',
    component: PaymentMethodsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePaymentMethods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaymentMethodsDetailComponent,
    resolve: {
      paymentMethods: PaymentMethodsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePaymentMethods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaymentMethodsUpdateComponent,
    resolve: {
      paymentMethods: PaymentMethodsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePaymentMethods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaymentMethodsUpdateComponent,
    resolve: {
      paymentMethods: PaymentMethodsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommercePaymentMethods.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
