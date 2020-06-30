import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerPaymentCreditCardExtended } from 'app/shared/model/vscommerce/customer-payment-credit-card-extended.model';

type EntityResponseType = HttpResponse<ICustomerPaymentCreditCardExtended>;
type EntityArrayResponseType = HttpResponse<ICustomerPaymentCreditCardExtended[]>;

@Injectable({ providedIn: 'root' })
export class CustomerPaymentCreditCardExtendedService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/customer-payment-credit-card-extendeds';

  constructor(protected http: HttpClient) {}

  create(customerPaymentCreditCardExtended: ICustomerPaymentCreditCardExtended): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPaymentCreditCardExtended);
    return this.http
      .post<ICustomerPaymentCreditCardExtended>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(customerPaymentCreditCardExtended: ICustomerPaymentCreditCardExtended): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPaymentCreditCardExtended);
    return this.http
      .put<ICustomerPaymentCreditCardExtended>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICustomerPaymentCreditCardExtended>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICustomerPaymentCreditCardExtended[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(
    customerPaymentCreditCardExtended: ICustomerPaymentCreditCardExtended
  ): ICustomerPaymentCreditCardExtended {
    const copy: ICustomerPaymentCreditCardExtended = Object.assign({}, customerPaymentCreditCardExtended, {
      lastEditeWhen:
        customerPaymentCreditCardExtended.lastEditeWhen && customerPaymentCreditCardExtended.lastEditeWhen.isValid()
          ? customerPaymentCreditCardExtended.lastEditeWhen.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastEditeWhen = res.body.lastEditeWhen ? moment(res.body.lastEditeWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((customerPaymentCreditCardExtended: ICustomerPaymentCreditCardExtended) => {
        customerPaymentCreditCardExtended.lastEditeWhen = customerPaymentCreditCardExtended.lastEditeWhen
          ? moment(customerPaymentCreditCardExtended.lastEditeWhen)
          : undefined;
      });
    }
    return res;
  }
}
