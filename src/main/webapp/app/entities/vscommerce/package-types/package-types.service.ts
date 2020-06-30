import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPackageTypes } from 'app/shared/model/vscommerce/package-types.model';

type EntityResponseType = HttpResponse<IPackageTypes>;
type EntityArrayResponseType = HttpResponse<IPackageTypes[]>;

@Injectable({ providedIn: 'root' })
export class PackageTypesService {
  public resourceUrl = SERVER_API_URL + 'services/vscommerce/api/package-types';

  constructor(protected http: HttpClient) {}

  create(packageTypes: IPackageTypes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(packageTypes);
    return this.http
      .post<IPackageTypes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(packageTypes: IPackageTypes): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(packageTypes);
    return this.http
      .put<IPackageTypes>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPackageTypes>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPackageTypes[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(packageTypes: IPackageTypes): IPackageTypes {
    const copy: IPackageTypes = Object.assign({}, packageTypes, {
      validFrom: packageTypes.validFrom && packageTypes.validFrom.isValid() ? packageTypes.validFrom.toJSON() : undefined,
      validTo: packageTypes.validTo && packageTypes.validTo.isValid() ? packageTypes.validTo.toJSON() : undefined,
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
      res.body.forEach((packageTypes: IPackageTypes) => {
        packageTypes.validFrom = packageTypes.validFrom ? moment(packageTypes.validFrom) : undefined;
        packageTypes.validTo = packageTypes.validTo ? moment(packageTypes.validTo) : undefined;
      });
    }
    return res;
  }
}
