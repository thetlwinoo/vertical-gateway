import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISupplierTransactions } from 'app/shared/model/vscommerce/supplier-transactions.model';

type EntityResponseType = HttpResponse<ISupplierTransactions>;
type EntityArrayResponseType = HttpResponse<ISupplierTransactions[]>;

@Injectable({ providedIn: 'root' })
export class SupplierTransactionsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/supplier-transactions';

  constructor(protected http: HttpClient) {}

  create(supplierTransactions: ISupplierTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supplierTransactions);
    return this.http
      .post<ISupplierTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(supplierTransactions: ISupplierTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supplierTransactions);
    return this.http
      .put<ISupplierTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISupplierTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISupplierTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(supplierTransactions: ISupplierTransactions): ISupplierTransactions {
    const copy: ISupplierTransactions = Object.assign({}, supplierTransactions, {
      transactionDate:
        supplierTransactions.transactionDate && supplierTransactions.transactionDate.isValid()
          ? supplierTransactions.transactionDate.toJSON()
          : undefined,
      finalizationDate:
        supplierTransactions.finalizationDate && supplierTransactions.finalizationDate.isValid()
          ? supplierTransactions.finalizationDate.toJSON()
          : undefined,
      lastEditedWhen:
        supplierTransactions.lastEditedWhen && supplierTransactions.lastEditedWhen.isValid()
          ? supplierTransactions.lastEditedWhen.toJSON()
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
      res.body.forEach((supplierTransactions: ISupplierTransactions) => {
        supplierTransactions.transactionDate = supplierTransactions.transactionDate
          ? moment(supplierTransactions.transactionDate)
          : undefined;
        supplierTransactions.finalizationDate = supplierTransactions.finalizationDate
          ? moment(supplierTransactions.finalizationDate)
          : undefined;
        supplierTransactions.lastEditedWhen = supplierTransactions.lastEditedWhen ? moment(supplierTransactions.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
