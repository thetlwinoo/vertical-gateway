import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVehicleTemperatures } from 'app/shared/model/vscommerce/vehicle-temperatures.model';
import { VehicleTemperaturesService } from './vehicle-temperatures.service';

@Component({
  templateUrl: './vehicle-temperatures-delete-dialog.component.html',
})
export class VehicleTemperaturesDeleteDialogComponent {
  vehicleTemperatures?: IVehicleTemperatures;

  constructor(
    protected vehicleTemperaturesService: VehicleTemperaturesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vehicleTemperaturesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('vehicleTemperaturesListModification');
      this.activeModal.close();
    });
  }
}
