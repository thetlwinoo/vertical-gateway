import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IColdRoomTemperatures } from 'app/shared/model/vscommerce/cold-room-temperatures.model';

type EntityResponseType = HttpResponse<IColdRoomTemperatures>;
type EntityArrayResponseType = HttpResponse<IColdRoomTemperatures[]>;

@Injectable({ providedIn: 'root' })
export class ColdRoomTemperaturesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/cold-room-temperatures';

  constructor(protected http: HttpClient) {}

  create(coldRoomTemperatures: IColdRoomTemperatures): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(coldRoomTemperatures);
    return this.http
      .post<IColdRoomTemperatures>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(coldRoomTemperatures: IColdRoomTemperatures): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(coldRoomTemperatures);
    return this.http
      .put<IColdRoomTemperatures>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IColdRoomTemperatures>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IColdRoomTemperatures[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(coldRoomTemperatures: IColdRoomTemperatures): IColdRoomTemperatures {
    const copy: IColdRoomTemperatures = Object.assign({}, coldRoomTemperatures, {
      recordedWhen:
        coldRoomTemperatures.recordedWhen && coldRoomTemperatures.recordedWhen.isValid()
          ? coldRoomTemperatures.recordedWhen.toJSON()
          : undefined,
      validFrom:
        coldRoomTemperatures.validFrom && coldRoomTemperatures.validFrom.isValid() ? coldRoomTemperatures.validFrom.toJSON() : undefined,
      validTo: coldRoomTemperatures.validTo && coldRoomTemperatures.validTo.isValid() ? coldRoomTemperatures.validTo.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.recordedWhen = res.body.recordedWhen ? moment(res.body.recordedWhen) : undefined;
      res.body.validFrom = res.body.validFrom ? moment(res.body.validFrom) : undefined;
      res.body.validTo = res.body.validTo ? moment(res.body.validTo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((coldRoomTemperatures: IColdRoomTemperatures) => {
        coldRoomTemperatures.recordedWhen = coldRoomTemperatures.recordedWhen ? moment(coldRoomTemperatures.recordedWhen) : undefined;
        coldRoomTemperatures.validFrom = coldRoomTemperatures.validFrom ? moment(coldRoomTemperatures.validFrom) : undefined;
        coldRoomTemperatures.validTo = coldRoomTemperatures.validTo ? moment(coldRoomTemperatures.validTo) : undefined;
      });
    }
    return res;
  }
}
