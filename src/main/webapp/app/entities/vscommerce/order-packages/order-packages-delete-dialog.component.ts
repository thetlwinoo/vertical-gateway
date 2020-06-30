import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderPackages } from 'app/shared/model/vscommerce/order-packages.model';
import { OrderPackagesService } from './order-packages.service';

@Component({
  templateUrl: './order-packages-delete-dialog.component.html',
})
export class OrderPackagesDeleteDialogComponent {
  orderPackages?: IOrderPackages;

  constructor(
    protected orderPackagesService: OrderPackagesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.orderPackagesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('orderPackagesListModification');
      this.activeModal.close();
    });
  }
}
