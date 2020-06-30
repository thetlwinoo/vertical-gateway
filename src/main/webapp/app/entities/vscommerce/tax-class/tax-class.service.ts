import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITaxClass } from 'app/shared/model/vscommerce/tax-class.model';

type EntityResponseType = HttpResponse<ITaxClass>;
type EntityArrayResponseType = HttpResponse<ITaxClass[]>;

@Injectable({ providedIn: 'root' })
export class TaxClassService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/tax-classes';

  constructor(protected http: HttpClient) {}

  create(taxClass: ITaxClass): Observable<EntityResponseType> {
    return this.http.post<ITaxClass>(this.resourceUrl, taxClass, { observe: 'response' });
  }

  update(taxClass: ITaxClass): Observable<EntityResponseType> {
    return this.http.put<ITaxClass>(this.resourceUrl, taxClass, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITaxClass>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITaxClass[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
