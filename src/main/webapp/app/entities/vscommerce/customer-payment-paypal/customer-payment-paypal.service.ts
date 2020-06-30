import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerPaymentPaypal } from 'app/shared/model/vscommerce/customer-payment-paypal.model';

type EntityResponseType = HttpResponse<ICustomerPaymentPaypal>;
type EntityArrayResponseType = HttpResponse<ICustomerPaymentPaypal[]>;

@Injectable({ providedIn: 'root' })
export class CustomerPaymentPaypalService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/customer-payment-paypals';

  constructor(protected http: HttpClient) {}

  create(customerPaymentPaypal: ICustomerPaymentPaypal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPaymentPaypal);
    return this.http
      .post<ICustomerPaymentPaypal>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(customerPaymentPaypal: ICustomerPaymentPaypal): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPaymentPaypal);
    return this.http
      .put<ICustomerPaymentPaypal>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICustomerPaymentPaypal>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICustomerPaymentPaypal[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(customerPaymentPaypal: ICustomerPaymentPaypal): ICustomerPaymentPaypal {
    const copy: ICustomerPaymentPaypal = Object.assign({}, customerPaymentPaypal, {
      lastEditedWhen:
        customerPaymentPaypal.lastEditedWhen && customerPaymentPaypal.lastEditedWhen.isValid()
          ? customerPaymentPaypal.lastEditedWhen.toJSON()
          : undefined,
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
      res.body.forEach((customerPaymentPaypal: ICustomerPaymentPaypal) => {
        customerPaymentPaypal.lastEditedWhen = customerPaymentPaypal.lastEditedWhen
          ? moment(customerPaymentPaypal.lastEditedWhen)
          : undefined;
      });
    }
    return res;
  }
}
