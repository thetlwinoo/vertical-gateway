import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISpecialDeals } from 'app/shared/model/vscommerce/special-deals.model';

type EntityResponseType = HttpResponse<ISpecialDeals>;
type EntityArrayResponseType = HttpResponse<ISpecialDeals[]>;

@Injectable({ providedIn: 'root' })
export class SpecialDealsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/special-deals';

  constructor(protected http: HttpClient) {}

  create(specialDeals: ISpecialDeals): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(specialDeals);
    return this.http
      .post<ISpecialDeals>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(specialDeals: ISpecialDeals): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(specialDeals);
    return this.http
      .put<ISpecialDeals>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISpecialDeals>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISpecialDeals[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(specialDeals: ISpecialDeals): ISpecialDeals {
    const copy: ISpecialDeals = Object.assign({}, specialDeals, {
      startDate: specialDeals.startDate && specialDeals.startDate.isValid() ? specialDeals.startDate.toJSON() : undefined,
      endDate: specialDeals.endDate && specialDeals.endDate.isValid() ? specialDeals.endDate.toJSON() : undefined,
      lastEditedWhen:
        specialDeals.lastEditedWhen && specialDeals.lastEditedWhen.isValid() ? specialDeals.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((specialDeals: ISpecialDeals) => {
        specialDeals.startDate = specialDeals.startDate ? moment(specialDeals.startDate) : undefined;
        specialDeals.endDate = specialDeals.endDate ? moment(specialDeals.endDate) : undefined;
        specialDeals.lastEditedWhen = specialDeals.lastEditedWhen ? moment(specialDeals.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
