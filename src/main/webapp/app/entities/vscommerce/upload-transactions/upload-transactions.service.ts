import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUploadTransactions } from 'app/shared/model/vscommerce/upload-transactions.model';

type EntityResponseType = HttpResponse<IUploadTransactions>;
type EntityArrayResponseType = HttpResponse<IUploadTransactions[]>;

@Injectable({ providedIn: 'root' })
export class UploadTransactionsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/upload-transactions';

  constructor(protected http: HttpClient) {}

  create(uploadTransactions: IUploadTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(uploadTransactions);
    return this.http
      .post<IUploadTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(uploadTransactions: IUploadTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(uploadTransactions);
    return this.http
      .put<IUploadTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUploadTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUploadTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(uploadTransactions: IUploadTransactions): IUploadTransactions {
    const copy: IUploadTransactions = Object.assign({}, uploadTransactions, {
      lastEditedWhen:
        uploadTransactions.lastEditedWhen && uploadTransactions.lastEditedWhen.isValid()
          ? uploadTransactions.lastEditedWhen.toJSON()
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
      res.body.forEach((uploadTransactions: IUploadTransactions) => {
        uploadTransactions.lastEditedWhen = uploadTransactions.lastEditedWhen ? moment(uploadTransactions.lastEditedWhen) : undefined;
      });
    }
    return res;
  }
}
