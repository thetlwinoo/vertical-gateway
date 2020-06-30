import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICardTypes } from 'app/shared/model/vscommerce/card-types.model';

type EntityResponseType = HttpResponse<ICardTypes>;
type EntityArrayResponseType = HttpResponse<ICardTypes[]>;

@Injectable({ providedIn: 'root' })
export class CardTypesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/card-types';

  constructor(protected http: HttpClient) {}

  create(cardTypes: ICardTypes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardTypes);
    return this.http
      .post<ICardTypes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cardTypes: ICardTypes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardTypes);
    return this.http
      .put<ICardTypes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICardTypes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICardTypes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cardTypes: ICardTypes): ICardTypes {
    const copy: ICardTypes = Object.assign({}, cardTypes, {
      modifiedDate: cardTypes.modifiedDate && cardTypes.modifiedDate.isValid() ? cardTypes.modifiedDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.modifiedDate = res.body.modifiedDate ? moment(res.body.modifiedDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cardTypes: ICardTypes) => {
        cardTypes.modifiedDate = cardTypes.modifiedDate ? moment(cardTypes.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
