import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBankAccounts, BankAccounts } from 'app/shared/model/vscommerce/bank-accounts.model';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsComponent } from './bank-accounts.component';
import { BankAccountsDetailComponent } from './bank-accounts-detail.component';
import { BankAccountsUpdateComponent } from './bank-accounts-update.component';

@Injectable({ providedIn: 'root' })
export class BankAccountsResolve implements Resolve<IBankAccounts> {
  constructor(private service: BankAccountsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBankAccounts> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bankAccounts: HttpResponse<BankAccounts>) => {
          if (bankAccounts.body) {
            return of(bankAccounts.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BankAccounts());
  }
}

export const bankAccountsRoute: Routes = [
  {
    path: '',
    component: BankAccountsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBankAccounts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BankAccountsDetailComponent,
    resolve: {
      bankAccounts: BankAccountsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBankAccounts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BankAccountsUpdateComponent,
    resolve: {
      bankAccounts: BankAccountsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBankAccounts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BankAccountsUpdateComponent,
    resolve: {
      bankAccounts: BankAccountsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceBankAccounts.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
