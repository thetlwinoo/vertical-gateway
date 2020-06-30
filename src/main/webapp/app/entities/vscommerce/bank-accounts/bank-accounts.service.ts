import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBankAccounts } from 'app/shared/model/vscommerce/bank-accounts.model';

type EntityResponseType = HttpResponse<IBankAccounts>;
type EntityArrayResponseType = HttpResponse<IBankAccounts[]>;

@Injectable({ providedIn: 'root' })
export class BankAccountsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/bank-accounts';

  constructor(protected http: HttpClient) {}

  create(bankAccounts: IBankAccounts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bankAccounts);
    return this.http
      .post<IBankAccounts>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(bankAccounts: IBankAccounts): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(bankAccounts);
    return this.http
      .put<IBankAccounts>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBankAccounts>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBankAccounts[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(bankAccounts: IBankAccounts): IBankAccounts {
    const copy: IBankAccounts = Object.assign({}, bankAccounts, {
      validForm: bankAccounts.validForm && bankAccounts.validForm.isValid() ? bankAccounts.validForm.toJSON() : undefined,
      validTo: bankAccounts.validTo && bankAccounts.validTo.isValid() ? bankAccounts.validTo.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.validForm = res.body.validForm ? moment(res.body.validForm) : undefined;
      res.body.validTo = res.body.validTo ? moment(res.body.validTo) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((bankAccounts: IBankAccounts) => {
        bankAccounts.validForm = bankAccounts.validForm ? moment(bankAccounts.validForm) : undefined;
        bankAccounts.validTo = bankAccounts.validTo ? moment(bankAccounts.validTo) : undefined;
      });
    }
    return res;
  }
}
