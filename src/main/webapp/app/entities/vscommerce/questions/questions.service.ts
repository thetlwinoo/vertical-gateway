import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQuestions } from 'app/shared/model/vscommerce/questions.model';

type EntityResponseType = HttpResponse<IQuestions>;
type EntityArrayResponseType = HttpResponse<IQuestions[]>;

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/questions';

  constructor(protected http: HttpClient) {}

  create(questions: IQuestions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(questions);
    return this.http
      .post<IQuestions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(questions: IQuestions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(questions);
    return this.http
      .put<IQuestions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IQuestions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IQuestions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(questions: IQuestions): IQuestions {
    const copy: IQuestions = Object.assign({}, questions, {
      customerQuestionOn:
        questions.customerQuestionOn && questions.customerQuestionOn.isValid() ? questions.customerQuestionOn.toJSON() : undefined,
      supplierAnswerOn:
        questions.supplierAnswerOn && questions.supplierAnswerOn.isValid() ? questions.supplierAnswerOn.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.customerQuestionOn = res.body.customerQuestionOn ? moment(res.body.customerQuestionOn) : undefined;
      res.body.supplierAnswerOn = res.body.supplierAnswerOn ? moment(res.body.supplierAnswerOn) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((questions: IQuestions) => {
        questions.customerQuestionOn = questions.customerQuestionOn ? moment(questions.customerQuestionOn) : undefined;
        questions.supplierAnswerOn = questions.supplierAnswerOn ? moment(questions.supplierAnswerOn) : undefined;
      });
    }
    return res;
  }
}
