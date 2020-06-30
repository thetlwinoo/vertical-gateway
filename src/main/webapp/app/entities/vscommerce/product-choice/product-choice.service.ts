import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductChoice } from 'app/shared/model/vscommerce/product-choice.model';

type EntityResponseType = HttpResponse<IProductChoice>;
type EntityArrayResponseType = HttpResponse<IProductChoice[]>;

@Injectable({ providedIn: 'root' })
export class ProductChoiceService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/product-choices';

  constructor(protected http: HttpClient) {}

  create(productChoice: IProductChoice): Observable<EntityResponseType> {
    return this.http.post<IProductChoice>(this.resourceUrl, productChoice, { observe: 'response' });
  }

  update(productChoice: IProductChoice): Observable<EntityResponseType> {
    return this.http.put<IProductChoice>(this.resourceUrl, productChoice, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductChoice>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductChoice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
