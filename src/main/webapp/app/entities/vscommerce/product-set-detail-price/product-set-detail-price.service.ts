import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductSetDetailPrice } from 'app/shared/model/vscommerce/product-set-detail-price.model';

type EntityResponseType = HttpResponse<IProductSetDetailPrice>;
type EntityArrayResponseType = HttpResponse<IProductSetDetailPrice[]>;

@Injectable({ providedIn: 'root' })
export class ProductSetDetailPriceService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/product-set-detail-prices';

  constructor(protected http: HttpClient) {}

  create(productSetDetailPrice: IProductSetDetailPrice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productSetDetailPrice);
    return this.http
      .post<IProductSetDetailPrice>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productSetDetailPrice: IProductSetDetailPrice): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productSetDetailPrice);
    return this.http
      .put<IProductSetDetailPrice>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProductSetDetailPrice>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductSetDetailPrice[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(productSetDetailPrice: IProductSetDetailPrice): IProductSetDetailPrice {
    const copy: IProductSetDetailPrice = Object.assign({}, productSetDetailPrice, {
      startDate:
        productSetDetailPrice.startDate && productSetDetailPrice.startDate.isValid() ? productSetDetailPrice.startDate.toJSON() : undefined,
      endDate:
        productSetDetailPrice.endDate && productSetDetailPrice.endDate.isValid() ? productSetDetailPrice.endDate.toJSON() : undefined,
      modifiedDate:
        productSetDetailPrice.modifiedDate && productSetDetailPrice.modifiedDate.isValid()
          ? productSetDetailPrice.modifiedDate.toJSON()
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
      res.body.forEach((productSetDetailPrice: IProductSetDetailPrice) => {
        productSetDetailPrice.startDate = productSetDetailPrice.startDate ? moment(productSetDetailPrice.startDate) : undefined;
        productSetDetailPrice.endDate = productSetDetailPrice.endDate ? moment(productSetDetailPrice.endDate) : undefined;
        productSetDetailPrice.modifiedDate = productSetDetailPrice.modifiedDate ? moment(productSetDetailPrice.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
