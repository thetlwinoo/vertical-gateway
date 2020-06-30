import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaymentMethods } from 'app/shared/model/vscommerce/payment-methods.model';

type EntityResponseType = HttpResponse<IPaymentMethods>;
type EntityArrayResponseType = HttpResponse<IPaymentMethods[]>;

@Injectable({ providedIn: 'root' })
export class PaymentMethodsService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/payment-methods';

  constructor(protected http: HttpClient) {}

  create(paymentMethods: IPaymentMethods): Observable<EntityResponseType> {
    return this.http.post<IPaymentMethods>(this.resourceUrl, paymentMethods, { observe: 'response' });
  }

  update(paymentMethods: IPaymentMethods): Observable<EntityResponseType> {
    return this.http.put<IPaymentMethods>(this.resourceUrl, paymentMethods, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaymentMethods>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentMethods[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
