import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICardTypeCreditCards } from 'app/shared/model/vscommerce/card-type-credit-cards.model';

type EntityResponseType = HttpResponse<ICardTypeCreditCards>;
type EntityArrayResponseType = HttpResponse<ICardTypeCreditCards[]>;

@Injectable({ providedIn: 'root' })
export class CardTypeCreditCardsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/card-type-credit-cards';

  constructor(protected http: HttpClient) {}

  create(cardTypeCreditCards: ICardTypeCreditCards): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardTypeCreditCards);
    return this.http
      .post<ICardTypeCreditCards>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cardTypeCreditCards: ICardTypeCreditCards): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardTypeCreditCards);
    return this.http
      .put<ICardTypeCreditCards>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICardTypeCreditCards>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICardTypeCreditCards[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cardTypeCreditCards: ICardTypeCreditCards): ICardTypeCreditCards {
    const copy: ICardTypeCreditCards = Object.assign({}, cardTypeCreditCards, {
      modifiedDate:
        cardTypeCreditCards.modifiedDate && cardTypeCreditCards.modifiedDate.isValid()
          ? cardTypeCreditCards.modifiedDate.toJSON()
          : undefined,
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
      res.body.forEach((cardTypeCreditCards: ICardTypeCreditCards) => {
        cardTypeCreditCards.modifiedDate = cardTypeCreditCards.modifiedDate ? moment(cardTypeCreditCards.modifiedDate) : undefined;
      });
    }
    return res;
  }
}
