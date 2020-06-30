import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CountriesComponent } from './countries.component';
import { CountriesDetailComponent } from './countries-detail.component';
import { CountriesUpdateComponent } from './countries-update.component';
import { CountriesDeleteDialogComponent } from './countries-delete-dialog.component';
import { countriesRoute } from './countries.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(countriesRoute)],
  declarations: [CountriesComponent, CountriesDetailComponent, CountriesUpdateComponent, CountriesDeleteDialogComponent],
  entryComponents: [CountriesDeleteDialogComponent],
})
export class VscommerceCountriesModule {}
