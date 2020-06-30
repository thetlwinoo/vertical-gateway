import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICurrencyRate } from 'app/shared/model/vscommerce/currency-rate.model';

type EntityResponseType = HttpResponse<ICurrencyRate>;
type EntityArrayResponseType = HttpResponse<ICurrencyRate[]>;

@Injectable({ providedIn: 'root' })
export class CurrencyRateService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/currency-rates';

  constructor(protected http: HttpClient) {}

  create(currencyRate: ICurrencyRate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(currencyRate);
    return this.http
      .post<ICurrencyRate>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(currencyRate: ICurrencyRate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(currencyRate);
    return this.http
      .put<ICurrencyRate>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICurrencyRate>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICurrencyRate[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(currencyRate: ICurrencyRate): ICurrencyRate {
    const copy: ICurrencyRate = Object.assign({}, currencyRate, {
      currencyRateDate:
        currencyRate.currencyRateDate && currencyRate.currencyRateDate.isValid() ? currencyRate.currencyRateDate.toJSON() : undefined,
      lastEditedWhen:
        currencyRate.lastEditedWhen && currencyRate.lastEditedWhen.isValid() ? currencyRate.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.currencyRateDate = res.body.currencyRateDate ? moment(res.body.currencyRateDate) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((currencyRate: ICurrencyRate) => {
        currencyRate.currencyRateDate = currencyRate.currencyRateDate ? moment(currencyRate.currencyRateDate) : undefined;
        currencyRate.lastEditedWhen = currencyRate.lastEditedWhen ? moment(currencyRate.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
