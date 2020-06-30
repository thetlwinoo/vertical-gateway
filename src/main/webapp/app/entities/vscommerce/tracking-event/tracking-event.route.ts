import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITrackingEvent, TrackingEvent } from 'app/shared/model/vscommerce/tracking-event.model';
import { TrackingEventService } from './tracking-event.service';
import { TrackingEventComponent } from './tracking-event.component';
import { TrackingEventDetailComponent } from './tracking-event-detail.component';
import { TrackingEventUpdateComponent } from './tracking-event-update.component';

@Injectable({ providedIn: 'root' })
export class TrackingEventResolve implements Resolve<ITrackingEvent> {
  constructor(private service: TrackingEventService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITrackingEvent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((trackingEvent: HttpResponse<TrackingEvent>) => {
          if (trackingEvent.body) {
            return of(trackingEvent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TrackingEvent());
  }
}

export const trackingEventRoute: Routes = [
  {
    path: '',
    component: TrackingEventComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTrackingEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TrackingEventDetailComponent,
    resolve: {
      trackingEvent: TrackingEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTrackingEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrackingEventUpdateComponent,
    resolve: {
      trackingEvent: TrackingEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTrackingEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TrackingEventUpdateComponent,
    resolve: {
      trackingEvent: TrackingEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceTrackingEvent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
