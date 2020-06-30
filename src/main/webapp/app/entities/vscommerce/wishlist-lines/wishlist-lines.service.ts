import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IWishlistLines } from 'app/shared/model/vscommerce/wishlist-lines.model';

type EntityResponseType = HttpResponse<IWishlistLines>;
type EntityArrayResponseType = HttpResponse<IWishlistLines[]>;

@Injectable({ providedIn: 'root' })
export class WishlistLinesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/wishlist-lines';

  constructor(protected http: HttpClient) {}

  create(wishlistLines: IWishlistLines): Observable<EntityResponseType> {
    return this.http.post<IWishlistLines>(this.resourceUrl, wishlistLines, { observe: 'response' });
  }

  update(wishlistLines: IWishlistLines): Observable<EntityResponseType> {
    return this.http.put<IWishlistLines>(this.resourceUrl, wishlistLines, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWishlistLines>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IWishlistLines[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
