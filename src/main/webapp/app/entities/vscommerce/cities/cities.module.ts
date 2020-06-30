import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { CitiesComponent } from './cities.component';
import { CitiesDetailComponent } from './cities-detail.component';
import { CitiesUpdateComponent } from './cities-update.component';
import { CitiesDeleteDialogComponent } from './cities-delete-dialog.component';
import { citiesRoute } from './cities.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(citiesRoute)],
  declarations: [CitiesComponent, CitiesDetailComponent, CitiesUpdateComponent, CitiesDeleteDialogComponent],
  entryComponents: [CitiesDeleteDialogComponent],
})
export class VscommerceCitiesModule {}
