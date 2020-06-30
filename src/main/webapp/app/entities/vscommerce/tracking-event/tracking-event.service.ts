import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrackingEvent } from 'app/shared/model/vscommerce/tracking-event.model';

type EntityResponseType = HttpResponse<ITrackingEvent>;
type EntityArrayResponseType = HttpResponse<ITrackingEvent[]>;

@Injectable({ providedIn: 'root' })
export class TrackingEventService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/tracking-events';

  constructor(protected http: HttpClient) {}

  create(trackingEvent: ITrackingEvent): Observable<EntityResponseType> {
    return this.http.post<ITrackingEvent>(this.resourceUrl, trackingEvent, { observe: 'response' });
  }

  update(trackingEvent: ITrackingEvent): Observable<EntityResponseType> {
    return this.http.put<ITrackingEvent>(this.resourceUrl, trackingEvent, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrackingEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrackingEvent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
