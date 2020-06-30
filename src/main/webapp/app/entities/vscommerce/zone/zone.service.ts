import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IZone } from 'app/shared/model/vscommerce/zone.model';

type EntityResponseType = HttpResponse<IZone>;
type EntityArrayResponseType = HttpResponse<IZone[]>;

@Injectable({ providedIn: 'root' })
export class ZoneService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/zones';

  constructor(protected http: HttpClient) {}

  create(zone: IZone): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(zone);
    return this.http
      .post<IZone>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(zone: IZone): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(zone);
    return this.http
      .put<IZone>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IZone>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IZone[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(zone: IZone): IZone {
    const copy: IZone = Object.assign({}, zone, {
      validFrom: zone.validFrom && zone.validFrom.isValid() ? zone.validFrom.toJSON() : undefined,
      validTo: zone.validTo && zone.validTo.isValid() ? zone.validTo.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validFrom = res.body.validFrom ? moment(res.body.validFrom) : undefined;
      res.body.validTo = res.body.validTo ? moment(res.body.validTo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((zone: IZone) => {
        zone.validFrom = zone.validFrom ? moment(zone.validFrom) : undefined;
        zone.validTo = zone.validTo ? moment(zone.validTo) : undefined;
      });
    }
    return res;
  }
}
