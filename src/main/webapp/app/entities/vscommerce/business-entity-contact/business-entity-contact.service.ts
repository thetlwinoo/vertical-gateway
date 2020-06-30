import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBusinessEntityContact } from 'app/shared/model/vscommerce/business-entity-contact.model';

type EntityResponseType = HttpResponse<IBusinessEntityContact>;
type EntityArrayResponseType = HttpResponse<IBusinessEntityContact[]>;

@Injectable({ providedIn: 'root' })
export class BusinessEntityContactService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/business-entity-contacts';

  constructor(protected http: HttpClient) {}

  create(businessEntityContact: IBusinessEntityContact): Observable<EntityResponseType> {
    return this.http.post<IBusinessEntityContact>(this.resourceUrl, businessEntityContact, { observe: 'response' });
  }

  update(businessEntityContact: IBusinessEntityContact): Observable<EntityResponseType> {
    return this.http.put<IBusinessEntityContact>(this.resourceUrl, businessEntityContact, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBusinessEntityContact>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBusinessEntityContact[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
