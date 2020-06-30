import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductAttribute } from 'app/shared/model/vscommerce/product-attribute.model';

type EntityResponseType = HttpResponse<IProductAttribute>;
type EntityArrayResponseType = HttpResponse<IProductAttribute[]>;

@Injectable({ providedIn: 'root' })
export class ProductAttributeService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/product-attributes';

  constructor(protected http: HttpClient) {}

  create(productAttribute: IProductAttribute): Observable<EntityResponseType> {
    return this.http.post<IProductAttribute>(this.resourceUrl, productAttribute, { observe: 'response' });
  }

  update(productAttribute: IProductAttribute): Observable<EntityResponseType> {
    return this.http.put<IProductAttribute>(this.resourceUrl, productAttribute, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductAttribute>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductAttribute[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
