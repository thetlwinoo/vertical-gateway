import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWarrantyTypes } from 'app/shared/model/vscommerce/warranty-types.model';

type EntityResponseType = HttpResponse<IWarrantyTypes>;
type EntityArrayResponseType = HttpResponse<IWarrantyTypes[]>;

@Injectable({ providedIn: 'root' })
export class WarrantyTypesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/warranty-types';

  constructor(protected http: HttpClient) {}

  create(warrantyTypes: IWarrantyTypes): Observable<EntityResponseType> {
    return this.http.post<IWarrantyTypes>(this.resourceUrl, warrantyTypes, { observe: 'response' });
  }

  update(warrantyTypes: IWarrantyTypes): Observable<EntityResponseType> {
    return this.http.put<IWarrantyTypes>(this.resourceUrl, warrantyTypes, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWarrantyTypes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWarrantyTypes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
