import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductSet } from 'app/shared/model/vscommerce/product-set.model';

type EntityResponseType = HttpResponse<IProductSet>;
type EntityArrayResponseType = HttpResponse<IProductSet[]>;

@Injectable({ providedIn: 'root' })
export class ProductSetService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/product-sets';

  constructor(protected http: HttpClient) {}

  create(productSet: IProductSet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productSet);
    return this.http
      .post<IProductSet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productSet: IProductSet): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productSet);
    return this.http
      .put<IProductSet>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProductSet>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductSet[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(productSet: IProductSet): IProductSet {
    const copy: IProductSet = Object.assign({}, productSet, {
      modifinedDate: productSet.modifinedDate && productSet.modifinedDate.isValid() ? productSet.modifinedDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.modifinedDate = res.body.modifinedDate ? moment(res.body.modifinedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((productSet: IProductSet) => {
        productSet.modifinedDate = productSet.modifinedDate ? moment(productSet.modifinedDate) : undefined;
      });
    }
    return res;
  }
}
