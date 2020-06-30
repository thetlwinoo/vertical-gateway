import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICards } from 'app/shared/model/vscommerce/cards.model';

type EntityResponseType = HttpResponse<ICards>;
type EntityArrayResponseType = HttpResponse<ICards[]>;

@Injectable({ providedIn: 'root' })
export class CardsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/cards';

  constructor(protected http: HttpClient) {}

  create(cards: ICards): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cards);
    return this.http
      .post<ICards>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cards: ICards): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cards);
    return this.http
      .put<ICards>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICards>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICards[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cards: ICards): ICards {
    const copy: ICards = Object.assign({}, cards, {
      modifiedDate: cards.modifiedDate && cards.modifiedDate.isValid() ? cards.modifiedDate.toJSON() : undefined,
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
      res.body.forEach((cards: ICards) => {
        cards.modifiedDate = cards.modifiedDate ? moment(cards.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
