import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerTransactions } from 'app/shared/model/vscommerce/customer-transactions.model';

type EntityResponseType = HttpResponse<ICustomerTransactions>;
type EntityArrayResponseType = HttpResponse<ICustomerTransactions[]>;

@Injectable({ providedIn: 'root' })
export class CustomerTransactionsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/customer-transactions';

  constructor(protected http: HttpClient) {}

  create(customerTransactions: ICustomerTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerTransactions);
    return this.http
      .post<ICustomerTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(customerTransactions: ICustomerTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerTransactions);
    return this.http
      .put<ICustomerTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICustomerTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICustomerTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(customerTransactions: ICustomerTransactions): ICustomerTransactions {
    const copy: ICustomerTransactions = Object.assign({}, customerTransactions, {
      transactionDate:
        customerTransactions.transactionDate && customerTransactions.transactionDate.isValid()
          ? customerTransactions.transactionDate.toJSON()
          : undefined,
      finalizationDate:
        customerTransactions.finalizationDate && customerTransactions.finalizationDate.isValid()
          ? customerTransactions.finalizationDate.toJSON()
          : undefined,
      lastEditedWhen:
        customerTransactions.lastEditedWhen && customerTransactions.lastEditedWhen.isValid()
          ? customerTransactions.lastEditedWhen.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.transactionDate = res.body.transactionDate ? moment(res.body.transactionDate) : undefined;
      res.body.finalizationDate = res.body.finalizationDate ? moment(res.body.finalizationDate) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((customerTransactions: ICustomerTransactions) => {
        customerTransactions.transactionDate = customerTransactions.transactionDate
          ? moment(customerTransactions.transactionDate)
          : undefined;
        customerTransactions.finalizationDate = customerTransactions.finalizationDate
          ? moment(customerTransactions.finalizationDate)
          : undefined;
        customerTransactions.lastEditedWhen = customerTransactions.lastEditedWhen ? moment(customerTransactions.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
