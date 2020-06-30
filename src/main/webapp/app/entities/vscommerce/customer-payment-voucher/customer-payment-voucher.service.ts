import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerPaymentVoucher } from 'app/shared/model/vscommerce/customer-payment-voucher.model';

type EntityResponseType = HttpResponse<ICustomerPaymentVoucher>;
type EntityArrayResponseType = HttpResponse<ICustomerPaymentVoucher[]>;

@Injectable({ providedIn: 'root' })
export class CustomerPaymentVoucherService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/customer-payment-vouchers';

  constructor(protected http: HttpClient) {}

  create(customerPaymentVoucher: ICustomerPaymentVoucher): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPaymentVoucher);
    return this.http
      .post<ICustomerPaymentVoucher>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(customerPaymentVoucher: ICustomerPaymentVoucher): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerPaymentVoucher);
    return this.http
      .put<ICustomerPaymentVoucher>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICustomerPaymentVoucher>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICustomerPaymentVoucher[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(customerPaymentVoucher: ICustomerPaymentVoucher): ICustomerPaymentVoucher {
    const copy: ICustomerPaymentVoucher = Object.assign({}, customerPaymentVoucher, {
      lastEditedWhen:
        customerPaymentVoucher.lastEditedWhen && customerPaymentVoucher.lastEditedWhen.isValid()
          ? customerPaymentVoucher.lastEditedWhen.toJSON()
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
      res.body.forEach((customerPaymentVoucher: ICustomerPaymentVoucher) => {
        customerPaymentVoucher.lastEditedWhen = customerPaymentVoucher.lastEditedWhen
          ? moment(customerPaymentVoucher.lastEditedWhen)
          : undefined;
      });
    }
    return res;
  }
}
