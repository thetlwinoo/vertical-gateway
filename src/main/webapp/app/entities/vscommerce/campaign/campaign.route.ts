import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICampaign, Campaign } from 'app/shared/model/vscommerce/campaign.model';
import { CampaignService } from './campaign.service';
import { CampaignComponent } from './campaign.component';
import { CampaignDetailComponent } from './campaign-detail.component';
import { CampaignUpdateComponent } from './campaign-update.component';

@Injectable({ providedIn: 'root' })
export class CampaignResolve implements Resolve<ICampaign> {
  constructor(private service: CampaignService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICampaign> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((campaign: HttpResponse<Campaign>) => {
          if (campaign.body) {
            return of(campaign.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Campaign());
  }
}

export const campaignRoute: Routes = [
  {
    path: '',
    component: CampaignComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CampaignDetailComponent,
    resolve: {
      campaign: CampaignResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CampaignUpdateComponent,
    resolve: {
      campaign: CampaignResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CampaignUpdateComponent,
    resolve: {
      campaign: CampaignResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceCampaign.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
