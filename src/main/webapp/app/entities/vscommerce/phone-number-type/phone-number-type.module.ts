import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { PhoneNumberTypeComponent } from './phone-number-type.component';
import { PhoneNumberTypeDetailComponent } from './phone-number-type-detail.component';
import { PhoneNumberTypeUpdateComponent } from './phone-number-type-update.component';
import { PhoneNumberTypeDeleteDialogComponent } from './phone-number-type-delete-dialog.component';
import { phoneNumberTypeRoute } from './phone-number-type.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(phoneNumberTypeRoute)],
  declarations: [
    PhoneNumberTypeComponent,
    PhoneNumberTypeDetailComponent,
    PhoneNumberTypeUpdateComponent,
    PhoneNumberTypeDeleteDialogComponent,
  ],
  entryComponents: [PhoneNumberTypeDeleteDialogComponent],
})
export class VscommercePhoneNumberTypeModule {}
