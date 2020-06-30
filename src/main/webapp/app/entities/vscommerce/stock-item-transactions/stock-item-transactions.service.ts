import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStockItemTransactions } from 'app/shared/model/vscommerce/stock-item-transactions.model';

type EntityResponseType = HttpResponse<IStockItemTransactions>;
type EntityArrayResponseType = HttpResponse<IStockItemTransactions[]>;

@Injectable({ providedIn: 'root' })
export class StockItemTransactionsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/stock-item-transactions';

  constructor(protected http: HttpClient) {}

  create(stockItemTransactions: IStockItemTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockItemTransactions);
    return this.http
      .post<IStockItemTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(stockItemTransactions: IStockItemTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockItemTransactions);
    return this.http
      .put<IStockItemTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStockItemTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStockItemTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(stockItemTransactions: IStockItemTransactions): IStockItemTransactions {
    const copy: IStockItemTransactions = Object.assign({}, stockItemTransactions, {
      transactionOccuredWhen:
        stockItemTransactions.transactionOccuredWhen && stockItemTransactions.transactionOccuredWhen.isValid()
          ? stockItemTransactions.transactionOccuredWhen.toJSON()
          : undefined,
      lastEditedWhen:
        stockItemTransactions.lastEditedWhen && stockItemTransactions.lastEditedWhen.isValid()
          ? stockItemTransactions.lastEditedWhen.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.transactionOccuredWhen = res.body.transactionOccuredWhen ? moment(res.body.transactionOccuredWhen) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((stockItemTransactions: IStockItemTransactions) => {
        stockItemTransactions.transactionOccuredWhen = stockItemTransactions.transactionOccuredWhen
          ? moment(stockItemTransactions.transactionOccuredWhen)
          : undefined;
        stockItemTransactions.lastEditedWhen = stockItemTransactions.lastEditedWhen
          ? moment(stockItemTransactions.lastEditedWhen)
          : undefined;
      });
    }
    return res;
  }
}
