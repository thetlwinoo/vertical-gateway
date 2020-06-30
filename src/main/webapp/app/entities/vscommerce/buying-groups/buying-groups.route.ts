import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBuyingGroups, BuyingGroups } from 'app/shared/model/vscommerce/buying-groups.model';
import { BuyingGroupsService } from './buying-groups.service';
import { BuyingGroupsComponent } from './buying-groups.component';
import { BuyingGroupsDetailComponent } from './buying-groups-detail.component';
import { BuyingGroupsUpdateComponent } from './buying-groups-update.component';

@Injectable({ providedIn: 'root' })
export class BuyingGroupsResolve implements Resolve<IBuyingGroups> {
  constructor(private service: BuyingGroupsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBuyingGroups> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((buyingGroups: HttpResponse<BuyingGroups>) => {
          if (buyingGroups.body) {
            return of(buyingGroups.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BuyingGroups());
  }
}

export const buyingGroupsRoute: Routes = [
  {
    path: '',
    component: BuyingGroupsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBuyingGroups.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BuyingGroupsDetailComponent,
    resolve: {
      buyingGroups: BuyingGroupsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBuyingGroups.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BuyingGroupsUpdateComponent,
    resolve: {
      buyingGroups: BuyingGroupsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBuyingGroups.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BuyingGroupsUpdateComponent,
    resolve: {
      buyingGroups: BuyingGroupsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBuyingGroups.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
