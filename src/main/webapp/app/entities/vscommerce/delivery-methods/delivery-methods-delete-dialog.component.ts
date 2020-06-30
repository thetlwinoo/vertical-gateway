import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';
import { DeliveryMethodsService } from './delivery-methods.service';

@Component({
  templateUrl: './delivery-methods-delete-dialog.component.html',
})
export class DeliveryMethodsDeleteDialogComponent {
  deliveryMethods?: IDeliveryMethods;

  constructor(
    protected deliveryMethodsService: DeliveryMethodsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deliveryMethodsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('deliveryMethodsListModification');
      this.activeModal.close();
    });
  }
}
