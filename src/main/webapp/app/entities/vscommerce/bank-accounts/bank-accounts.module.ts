import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { BankAccountsComponent } from './bank-accounts.component';
import { BankAccountsDetailComponent } from './bank-accounts-detail.component';
import { BankAccountsUpdateComponent } from './bank-accounts-update.component';
import { BankAccountsDeleteDialogComponent } from './bank-accounts-delete-dialog.component';
import { bankAccountsRoute } from './bank-accounts.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(bankAccountsRoute)],
  declarations: [BankAccountsComponent, BankAccountsDetailComponent, BankAccountsUpdateComponent, BankAccountsDeleteDialogComponent],
  entryComponents: [BankAccountsDeleteDialogComponent],
})
export class VscommerceBankAccountsModule {}
