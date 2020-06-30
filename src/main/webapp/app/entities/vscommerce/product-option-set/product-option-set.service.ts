import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductOptionSet } from 'app/shared/model/vscommerce/product-option-set.model';

type EntityResponseType = HttpResponse<IProductOptionSet>;
type EntityArrayResponseType = HttpResponse<IProductOptionSet[]>;

@Injectable({ providedIn: 'root' })
export class ProductOptionSetService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/product-option-sets';

  constructor(protected http: HttpClient) {}

  create(productOptionSet: IProductOptionSet): Observable<EntityResponseType> {
    return this.http.post<IProductOptionSet>(this.resourceUrl, productOptionSet, { observe: 'response' });
  }

  update(productOptionSet: IProductOptionSet): Observable<EntityResponseType> {
    return this.http.put<IProductOptionSet>(this.resourceUrl, productOptionSet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductOptionSet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductOptionSet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
