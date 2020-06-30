import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerPaymentCreditCard } from 'app/shared/model/vscommerce/customer-payment-credit-card.model';

type EntityResponseType = HttpResponse<ICustomerPaymentCreditCard>;
type EntityArrayResponseType = HttpResponse<ICustomerPaymentCreditCard[]>;

@Injectable({ providedIn: 'root' })
export class CustomerPaymentCreditCardService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/customer-payment-credit-cards';

  constructor(protected http: HttpClient) {}

  create(customerPaymentCreditCard: ICustomerPaymentCreditCard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPaymentCreditCard);
    return this.http
      .post<ICustomerPaymentCreditCard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(customerPaymentCreditCard: ICustomerPaymentCreditCard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPaymentCreditCard);
    return this.http
      .put<ICustomerPaymentCreditCard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICustomerPaymentCreditCard>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICustomerPaymentCreditCard[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(customerPaymentCreditCard: ICustomerPaymentCreditCard): ICustomerPaymentCreditCard {
    const copy: ICustomerPaymentCreditCard = Object.assign({}, customerPaymentCreditCard, {
      lastEditedWhen:
        customerPaymentCreditCard.lastEditedWhen && customerPaymentCreditCard.lastEditedWhen.isValid()
          ? customerPaymentCreditCard.lastEditedWhen.toJSON()
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
      res.body.forEach((customerPaymentCreditCard: ICustomerPaymentCreditCard) => {
        customerPaymentCreditCard.lastEditedWhen = customerPaymentCreditCard.lastEditedWhen
          ? moment(customerPaymentCreditCard.lastEditedWhen)
          : undefined;
      });
    }
    return res;
  }
}
