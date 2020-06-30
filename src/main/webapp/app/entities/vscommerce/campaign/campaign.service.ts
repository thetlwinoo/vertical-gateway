import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICampaign } from 'app/shared/model/vscommerce/campaign.model';

type EntityResponseType = HttpResponse<ICampaign>;
type EntityArrayResponseType = HttpResponse<ICampaign[]>;

@Injectable({ providedIn: 'root' })
export class CampaignService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/campaigns';

  constructor(protected http: HttpClient) {}

  create(campaign: ICampaign): Observable<EntityResponseType> {
    return this.http.post<ICampaign>(this.resourceUrl, campaign, { observe: 'response' });
  }

  update(campaign: ICampaign): Observable<EntityResponseType> {
    return this.http.put<ICampaign>(this.resourceUrl, campaign, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICampaign>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICampaign[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
