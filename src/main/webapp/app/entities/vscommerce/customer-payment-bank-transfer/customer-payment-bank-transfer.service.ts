import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerPaymentBankTransfer } from 'app/shared/model/vscommerce/customer-payment-bank-transfer.model';

type EntityResponseType = HttpResponse<ICustomerPaymentBankTransfer>;
type EntityArrayResponseType = HttpResponse<ICustomerPaymentBankTransfer[]>;

@Injectable({ providedIn: 'root' })
export class CustomerPaymentBankTransferService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/customer-payment-bank-transfers';

  constructor(protected http: HttpClient) {}

  create(customerPaymentBankTransfer: ICustomerPaymentBankTransfer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPaymentBankTransfer);
    return this.http
      .post<ICustomerPaymentBankTransfer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(customerPaymentBankTransfer: ICustomerPaymentBankTransfer): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPaymentBankTransfer);
    return this.http
      .put<ICustomerPaymentBankTransfer>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICustomerPaymentBankTransfer>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICustomerPaymentBankTransfer[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(customerPaymentBankTransfer: ICustomerPaymentBankTransfer): ICustomerPaymentBankTransfer {
    const copy: ICustomerPaymentBankTransfer = Object.assign({}, customerPaymentBankTransfer, {
      dateOfTransfer:
        customerPaymentBankTransfer.dateOfTransfer && customerPaymentBankTransfer.dateOfTransfer.isValid()
          ? customerPaymentBankTransfer.dateOfTransfer.toJSON()
          : undefined,
      lastEditedWhen:
        customerPaymentBankTransfer.lastEditedWhen && customerPaymentBankTransfer.lastEditedWhen.isValid()
          ? customerPaymentBankTransfer.lastEditedWhen.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfTransfer = res.body.dateOfTransfer ? moment(res.body.dateOfTransfer) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((customerPaymentBankTransfer: ICustomerPaymentBankTransfer) => {
        customerPaymentBankTransfer.dateOfTransfer = customerPaymentBankTransfer.dateOfTransfer
          ? moment(customerPaymentBankTransfer.dateOfTransfer)
          : undefined;
        customerPaymentBankTransfer.lastEditedWhen = customerPaymentBankTransfer.lastEditedWhen
          ? moment(customerPaymentBankTransfer.lastEditedWhen)
          : undefined;
      });
    }
    return res;
  }
}
