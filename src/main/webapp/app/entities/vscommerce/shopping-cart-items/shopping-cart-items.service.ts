import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IShoppingCartItems } from 'app/shared/model/vscommerce/shopping-cart-items.model';

type EntityResponseType = HttpResponse<IShoppingCartItems>;
type EntityArrayResponseType = HttpResponse<IShoppingCartItems[]>;

@Injectable({ providedIn: 'root' })
export class ShoppingCartItemsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/shopping-cart-items';

  constructor(protected http: HttpClient) {}

  create(shoppingCartItems: IShoppingCartItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shoppingCartItems);
    return this.http
      .post<IShoppingCartItems>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(shoppingCartItems: IShoppingCartItems): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shoppingCartItems);
    return this.http
      .put<IShoppingCartItems>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IShoppingCartItems>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IShoppingCartItems[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(shoppingCartItems: IShoppingCartItems): IShoppingCartItems {
    const copy: IShoppingCartItems = Object.assign({}, shoppingCartItems, {
      lastEditedWhen:
        shoppingCartItems.lastEditedWhen && shoppingCartItems.lastEditedWhen.isValid()
          ? shoppingCartItems.lastEditedWhen.toJSON()
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
      res.body.forEach((shoppingCartItems: IShoppingCartItems) => {
        shoppingCartItems.lastEditedWhen = shoppingCartItems.lastEditedWhen ? moment(shoppingCartItems.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
