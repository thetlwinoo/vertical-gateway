import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVehicleTemperatures } from 'app/shared/model/vscommerce/vehicle-temperatures.model';
import { VehicleTemperaturesService } from './vehicle-temperatures.service';
import { VehicleTemperaturesDeleteDialogComponent } from './vehicle-temperatures-delete-dialog.component';

@Component({
  selector: 'jhi-vehicle-temperatures',
  templateUrl: './vehicle-temperatures.component.html',
})
export class VehicleTemperaturesComponent implements OnInit, OnDestroy {
  vehicleTemperatures?: IVehicleTemperatures[];
  eventSubscriber?: Subscription;

  constructor(
    protected vehicleTemperaturesService: VehicleTemperaturesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.vehicleTemperaturesService
      .query()
      .subscribe((res: HttpResponse<IVehicleTemperatures[]>) => (this.vehicleTemperatures = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVehicleTemperatures();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVehicleTemperatures): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVehicleTemperatures(): void {
    this.eventSubscriber = this.eventManager.subscribe('vehicleTemperaturesListModification', () => this.loadAll());
  }

  delete(vehicleTemperatures: IVehicleTemperatures): void {
    const modalRef = this.modalService.open(VehicleTemperaturesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.vehicleTemperatures = vehicleTemperatures;
  }
}
