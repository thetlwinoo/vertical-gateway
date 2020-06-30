import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILogistics } from 'app/shared/model/vscommerce/logistics.model';

type EntityResponseType = HttpResponse<ILogistics>;
type EntityArrayResponseType = HttpResponse<ILogistics[]>;

@Injectable({ providedIn: 'root' })
export class LogisticsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/logistics';

  constructor(protected http: HttpClient) {}

  create(logistics: ILogistics): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logistics);
    return this.http
      .post<ILogistics>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(logistics: ILogistics): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(logistics);
    return this.http
      .put<ILogistics>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ILogistics>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ILogistics[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(logistics: ILogistics): ILogistics {
    const copy: ILogistics = Object.assign({}, logistics, {
      lastEditedWhen: logistics.lastEditedWhen && logistics.lastEditedWhen.isValid() ? logistics.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((logistics: ILogistics) => {
        logistics.lastEditedWhen = logistics.lastEditedWhen ? moment(logistics.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
