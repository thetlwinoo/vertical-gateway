import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBarcodeTypes, BarcodeTypes } from 'app/shared/model/vscommerce/barcode-types.model';
import { BarcodeTypesService } from './barcode-types.service';
import { BarcodeTypesComponent } from './barcode-types.component';
import { BarcodeTypesDetailComponent } from './barcode-types-detail.component';
import { BarcodeTypesUpdateComponent } from './barcode-types-update.component';

@Injectable({ providedIn: 'root' })
export class BarcodeTypesResolve implements Resolve<IBarcodeTypes> {
  constructor(private service: BarcodeTypesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBarcodeTypes> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((barcodeTypes: HttpResponse<BarcodeTypes>) => {
          if (barcodeTypes.body) {
            return of(barcodeTypes.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BarcodeTypes());
  }
}

export const barcodeTypesRoute: Routes = [
  {
    path: '',
    component: BarcodeTypesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBarcodeTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BarcodeTypesDetailComponent,
    resolve: {
      barcodeTypes: BarcodeTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBarcodeTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BarcodeTypesUpdateComponent,
    resolve: {
      barcodeTypes: BarcodeTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBarcodeTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BarcodeTypesUpdateComponent,
    resolve: {
      barcodeTypes: BarcodeTypesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBarcodeTypes.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
