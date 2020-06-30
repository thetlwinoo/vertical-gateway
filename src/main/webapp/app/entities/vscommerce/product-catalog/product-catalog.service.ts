import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductCatalog } from 'app/shared/model/vscommerce/product-catalog.model';

type EntityResponseType = HttpResponse<IProductCatalog>;
type EntityArrayResponseType = HttpResponse<IProductCatalog[]>;

@Injectable({ providedIn: 'root' })
export class ProductCatalogService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/product-catalogs';

  constructor(protected http: HttpClient) {}

  create(productCatalog: IProductCatalog): Observable<EntityResponseType> {
    return this.http.post<IProductCatalog>(this.resourceUrl, productCatalog, { observe: 'response' });
  }

  update(productCatalog: IProductCatalog): Observable<EntityResponseType> {
    return this.http.put<IProductCatalog>(this.resourceUrl, productCatalog, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductCatalog>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductCatalog[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
