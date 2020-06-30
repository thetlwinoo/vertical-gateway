import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICompareLines } from 'app/shared/model/vscommerce/compare-lines.model';

type EntityResponseType = HttpResponse<ICompareLines>;
type EntityArrayResponseType = HttpResponse<ICompareLines[]>;

@Injectable({ providedIn: 'root' })
export class CompareLinesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/compare-lines';

  constructor(protected http: HttpClient) {}

  create(compareLines: ICompareLines): Observable<EntityResponseType> {
    return this.http.post<ICompareLines>(this.resourceUrl, compareLines, { observe: 'response' });
  }

  update(compareLines: ICompareLines): Observable<EntityResponseType> {
    return this.http.put<ICompareLines>(this.resourceUrl, compareLines, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompareLines>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompareLines[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
