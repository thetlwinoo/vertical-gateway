import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductDocument } from 'app/shared/model/vscommerce/product-document.model';

type EntityResponseType = HttpResponse<IProductDocument>;
type EntityArrayResponseType = HttpResponse<IProductDocument[]>;

@Injectable({ providedIn: 'root' })
export class ProductDocumentService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/product-documents';

  constructor(protected http: HttpClient) {}

  create(productDocument: IProductDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productDocument);
    return this.http
      .post<IProductDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(productDocument: IProductDocument): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productDocument);
    return this.http
      .put<IProductDocument>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProductDocument>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProductDocument[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(productDocument: IProductDocument): IProductDocument {
    const copy: IProductDocument = Object.assign({}, productDocument, {
      lastEditedWhen:
        productDocument.lastEditedWhen && productDocument.lastEditedWhen.isValid() ? productDocument.lastEditedWhen.toJSON() : undefined,
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
      res.body.forEach((productDocument: IProductDocument) => {
        productDocument.lastEditedWhen = productDocument.lastEditedWhen ? moment(productDocument.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
