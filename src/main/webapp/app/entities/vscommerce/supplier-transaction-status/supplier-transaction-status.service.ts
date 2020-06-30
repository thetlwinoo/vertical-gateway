import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISupplierTransactionStatus } from 'app/shared/model/vscommerce/supplier-transaction-status.model';

type EntityResponseType = HttpResponse<ISupplierTransactionStatus>;
type EntityArrayResponseType = HttpResponse<ISupplierTransactionStatus[]>;

@Injectable({ providedIn: 'root' })
export class SupplierTransactionStatusService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/supplier-transaction-statuses';

  constructor(protected http: HttpClient) {}

  create(supplierTransactionStatus: ISupplierTransactionStatus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supplierTransactionStatus);
    return this.http
      .post<ISupplierTransactionStatus>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(supplierTransactionStatus: ISupplierTransactionStatus): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(supplierTransactionStatus);
    return this.http
      .put<ISupplierTransactionStatus>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISupplierTransactionStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISupplierTransactionStatus[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(supplierTransactionStatus: ISupplierTransactionStatus): ISupplierTransactionStatus {
    const copy: ISupplierTransactionStatus = Object.assign({}, supplierTransactionStatus, {
      lastEditedWhen:
        supplierTransactionStatus.lastEditedWhen && supplierTransactionStatus.lastEditedWhen.isValid()
          ? supplierTransactionStatus.lastEditedWhen.toJSON()
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
      res.body.forEach((supplierTransactionStatus: ISupplierTransactionStatus) => {
        supplierTransactionStatus.lastEditedWhen = supplierTransactionStatus.lastEditedWhen
          ? moment(supplierTransactionStatus.lastEditedWhen)
          : undefined;
      });
    }
    return res;
  }
}
