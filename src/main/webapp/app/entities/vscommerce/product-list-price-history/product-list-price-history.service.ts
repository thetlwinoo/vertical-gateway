import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductListPriceHistory } from 'app/shared/model/vscommerce/product-list-price-history.model';

type EntityResponseType = HttpResponse<IProductListPriceHistory>;
type EntityArrayResponseType = HttpResponse<IProductListPriceHistory[]>;

@Injectable({ providedIn: 'root' })
export class ProductListPriceHistoryService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/product-list-price-histories';

  constructor(protected http: HttpClient) {}

  create(productListPriceHistory: IProductListPriceHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productListPriceHistory);
    return this.http
      .post<IProductListPriceHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productListPriceHistory: IProductListPriceHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productListPriceHistory);
    return this.http
      .put<IProductListPriceHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProductListPriceHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductListPriceHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(productListPriceHistory: IProductListPriceHistory): IProductListPriceHistory {
    const copy: IProductListPriceHistory = Object.assign({}, productListPriceHistory, {
      startDate:
        productListPriceHistory.startDate && productListPriceHistory.startDate.isValid()
          ? productListPriceHistory.startDate.toJSON()
          : undefined,
      endDate:
        productListPriceHistory.endDate && productListPriceHistory.endDate.isValid() ? productListPriceHistory.endDate.toJSON() : undefined,
      modifiedDate:
        productListPriceHistory.modifiedDate && productListPriceHistory.modifiedDate.isValid()
          ? productListPriceHistory.modifiedDate.toJSON()
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
      res.body.modifiedDate = res.body.modifiedDate ? moment(res.body.modifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((productListPriceHistory: IProductListPriceHistory) => {
        productListPriceHistory.startDate = productListPriceHistory.startDate ? moment(productListPriceHistory.startDate) : undefined;
        productListPriceHistory.endDate = productListPriceHistory.endDate ? moment(productListPriceHistory.endDate) : undefined;
        productListPriceHistory.modifiedDate = productListPriceHistory.modifiedDate
          ? moment(productListPriceHistory.modifiedDate)
          : undefined;
      });
    }
    return res;
  }
}
