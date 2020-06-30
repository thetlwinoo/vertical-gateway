import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITransactionTypes } from 'app/shared/model/vscommerce/transaction-types.model';

type EntityResponseType = HttpResponse<ITransactionTypes>;
type EntityArrayResponseType = HttpResponse<ITransactionTypes[]>;

@Injectable({ providedIn: 'root' })
export class TransactionTypesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/transaction-types';

  constructor(protected http: HttpClient) {}

  create(transactionTypes: ITransactionTypes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactionTypes);
    return this.http
      .post<ITransactionTypes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(transactionTypes: ITransactionTypes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transactionTypes);
    return this.http
      .put<ITransactionTypes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITransactionTypes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITransactionTypes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(transactionTypes: ITransactionTypes): ITransactionTypes {
    const copy: ITransactionTypes = Object.assign({}, transactionTypes, {
      validFrom: transactionTypes.validFrom && transactionTypes.validFrom.isValid() ? transactionTypes.validFrom.toJSON() : undefined,
      validTo: transactionTypes.validTo && transactionTypes.validTo.isValid() ? transactionTypes.validTo.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validFrom = res.body.validFrom ? moment(res.body.validFrom) : undefined;
      res.body.validTo = res.body.validTo ? moment(res.body.validTo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((transactionTypes: ITransactionTypes) => {
        transactionTypes.validFrom = transactionTypes.validFrom ? moment(transactionTypes.validFrom) : undefined;
        transactionTypes.validTo = transactionTypes.validTo ? moment(transactionTypes.validTo) : undefined;
      });
    }
    return res;
  }
}
