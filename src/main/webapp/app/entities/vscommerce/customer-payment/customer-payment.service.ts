import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';

type EntityResponseType = HttpResponse<ICustomerPayment>;
type EntityArrayResponseType = HttpResponse<ICustomerPayment[]>;

@Injectable({ providedIn: 'root' })
export class CustomerPaymentService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/customer-payments';

  constructor(protected http: HttpClient) {}

  create(customerPayment: ICustomerPayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPayment);
    return this.http
      .post<ICustomerPayment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(customerPayment: ICustomerPayment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPayment);
    return this.http
      .put<ICustomerPayment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICustomerPayment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICustomerPayment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(customerPayment: ICustomerPayment): ICustomerPayment {
    const copy: ICustomerPayment = Object.assign({}, customerPayment, {
      lastEditedWhen:
        customerPayment.lastEditedWhen && customerPayment.lastEditedWhen.isValid() ? customerPayment.lastEditedWhen.toJSON() : undefined,
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
      res.body.forEach((customerPayment: ICustomerPayment) => {
        customerPayment.lastEditedWhen = customerPayment.lastEditedWhen ? moment(customerPayment.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
