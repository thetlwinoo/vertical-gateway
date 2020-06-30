import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICreditCardType } from 'app/shared/model/vscommerce/credit-card-type.model';

type EntityResponseType = HttpResponse<ICreditCardType>;
type EntityArrayResponseType = HttpResponse<ICreditCardType[]>;

@Injectable({ providedIn: 'root' })
export class CreditCardTypeService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/credit-card-types';

  constructor(protected http: HttpClient) {}

  create(creditCardType: ICreditCardType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditCardType);
    return this.http
      .post<ICreditCardType>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(creditCardType: ICreditCardType): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(creditCardType);
    return this.http
      .put<ICreditCardType>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICreditCardType>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICreditCardType[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(creditCardType: ICreditCardType): ICreditCardType {
    const copy: ICreditCardType = Object.assign({}, creditCardType, {
      modifiedDate: creditCardType.modifiedDate && creditCardType.modifiedDate.isValid() ? creditCardType.modifiedDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.modifiedDate = res.body.modifiedDate ? moment(res.body.modifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((creditCardType: ICreditCardType) => {
        creditCardType.modifiedDate = creditCardType.modifiedDate ? moment(creditCardType.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
