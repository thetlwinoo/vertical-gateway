import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICompareLines, CompareLines } from 'app/shared/model/vscommerce/compare-lines.model';
import { CompareLinesService } from './compare-lines.service';
import { CompareLinesComponent } from './compare-lines.component';
import { CompareLinesDetailComponent } from './compare-lines-detail.component';
import { CompareLinesUpdateComponent } from './compare-lines-update.component';

@Injectable({ providedIn: 'root' })
export class CompareLinesResolve implements Resolve<ICompareLines> {
  constructor(private service: CompareLinesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICompareLines> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((compareLines: HttpResponse<CompareLines>) => {
          if (compareLines.body) {
            return of(compareLines.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CompareLines());
  }
}

export const compareLinesRoute: Routes = [
  {
    path: '',
    component: CompareLinesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCompareLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CompareLinesDetailComponent,
    resolve: {
      compareLines: CompareLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCompareLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CompareLinesUpdateComponent,
    resolve: {
      compareLines: CompareLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCompareLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CompareLinesUpdateComponent,
    resolve: {
      compareLines: CompareLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCompareLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
