import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IReviewLines, ReviewLines } from 'app/shared/model/vscommerce/review-lines.model';
import { ReviewLinesService } from './review-lines.service';
import { ReviewLinesComponent } from './review-lines.component';
import { ReviewLinesDetailComponent } from './review-lines-detail.component';
import { ReviewLinesUpdateComponent } from './review-lines-update.component';

@Injectable({ providedIn: 'root' })
export class ReviewLinesResolve implements Resolve<IReviewLines> {
  constructor(private service: ReviewLinesService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReviewLines> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((reviewLines: HttpResponse<ReviewLines>) => {
          if (reviewLines.body) {
            return of(reviewLines.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ReviewLines());
  }
}

export const reviewLinesRoute: Routes = [
  {
    path: '',
    component: ReviewLinesComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceReviewLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReviewLinesDetailComponent,
    resolve: {
      reviewLines: ReviewLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceReviewLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReviewLinesUpdateComponent,
    resolve: {
      reviewLines: ReviewLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceReviewLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReviewLinesUpdateComponent,
    resolve: {
      reviewLines: ReviewLinesResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceReviewLines.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
