import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVehicleTemperatures } from 'app/shared/model/vscommerce/vehicle-temperatures.model';

@Component({
  selector: 'jhi-vehicle-temperatures-detail',
  templateUrl: './vehicle-temperatures-detail.component.html',
})
export class VehicleTemperaturesDetailComponent implements OnInit {
  vehicleTemperatures: IVehicleTemperatures | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ vehicleTemperatures }) => (this.vehicleTemperatures = vehicleTemperatures));
  }

  previousState(): void {
    window.history.back();
  }
}
