import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';

type EntityResponseType = HttpResponse<IStockItems>;
type EntityArrayResponseType = HttpResponse<IStockItems[]>;

@Injectable({ providedIn: 'root' })
export class StockItemsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/stock-items';

  constructor(protected http: HttpClient) {}

  create(stockItems: IStockItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockItems);
    return this.http
      .post<IStockItems>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(stockItems: IStockItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(stockItems);
    return this.http
      .put<IStockItems>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStockItems>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStockItems[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(stockItems: IStockItems): IStockItems {
    const copy: IStockItems = Object.assign({}, stockItems, {
      sellStartDate: stockItems.sellStartDate && stockItems.sellStartDate.isValid() ? stockItems.sellStartDate.toJSON() : undefined,
      sellEndDate: stockItems.sellEndDate && stockItems.sellEndDate.isValid() ? stockItems.sellEndDate.toJSON() : undefined,
      lastEditedWhen: stockItems.lastEditedWhen && stockItems.lastEditedWhen.isValid() ? stockItems.lastEditedWhen.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.sellStartDate = res.body.sellStartDate ? moment(res.body.sellStartDate) : undefined;
      res.body.sellEndDate = res.body.sellEndDate ? moment(res.body.sellEndDate) : undefined;
      res.body.lastEditedWhen = res.body.lastEditedWhen ? moment(res.body.lastEditedWhen) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((stockItems: IStockItems) => {
        stockItems.sellStartDate = stockItems.sellStartDate ? moment(stockItems.sellStartDate) : undefined;
        stockItems.sellEndDate = stockItems.sellEndDate ? moment(stockItems.sellEndDate) : undefined;
        stockItems.lastEditedWhen = stockItems.lastEditedWhen ? moment(stockItems.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
