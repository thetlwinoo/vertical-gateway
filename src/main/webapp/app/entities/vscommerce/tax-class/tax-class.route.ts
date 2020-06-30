import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITaxClass, TaxClass } from 'app/shared/model/vscommerce/tax-class.model';
import { TaxClassService } from './tax-class.service';
import { TaxClassComponent } from './tax-class.component';
import { TaxClassDetailComponent } from './tax-class-detail.component';
import { TaxClassUpdateComponent } from './tax-class-update.component';

@Injectable({ providedIn: 'root' })
export class TaxClassResolve implements Resolve<ITaxClass> {
  constructor(private service: TaxClassService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITaxClass> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((taxClass: HttpResponse<TaxClass>) => {
          if (taxClass.body) {
            return of(taxClass.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TaxClass());
  }
}

export const taxClassRoute: Routes = [
  {
    path: '',
    component: TaxClassComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTaxClass.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaxClassDetailComponent,
    resolve: {
      taxClass: TaxClassResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTaxClass.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaxClassUpdateComponent,
    resolve: {
      taxClass: TaxClassResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTaxClass.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaxClassUpdateComponent,
    resolve: {
      taxClass: TaxClassResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTaxClass.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
