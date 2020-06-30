import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICustomerCategories } from 'app/shared/model/vscommerce/customer-categories.model';

type EntityResponseType = HttpResponse<ICustomerCategories>;
type EntityArrayResponseType = HttpResponse<ICustomerCategories[]>;

@Injectable({ providedIn: 'root' })
export class CustomerCategoriesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/customer-categories';

  constructor(protected http: HttpClient) {}

  create(customerCategories: ICustomerCategories): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerCategories);
    return this.http
      .post<ICustomerCategories>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(customerCategories: ICustomerCategories): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(customerCategories);
    return this.http
      .put<ICustomerCategories>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICustomerCategories>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICustomerCategories[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(customerCategories: ICustomerCategories): ICustomerCategories {
    const copy: ICustomerCategories = Object.assign({}, customerCategories, {
      validFrom: customerCategories.validFrom && customerCategories.validFrom.isValid() ? customerCategories.validFrom.toJSON() : undefined,
      validTo: customerCategories.validTo && customerCategories.validTo.isValid() ? customerCategories.validTo.toJSON() : undefined,
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
      res.body.forEach((customerCategories: ICustomerCategories) => {
        customerCategories.validFrom = customerCategories.validFrom ? moment(customerCategories.validFrom) : undefined;
        customerCategories.validTo = customerCategories.validTo ? moment(customerCategories.validTo) : undefined;
      });
    }
    return res;
  }
}
