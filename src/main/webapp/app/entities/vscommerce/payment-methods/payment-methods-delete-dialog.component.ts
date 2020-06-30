import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaymentMethods } from 'app/shared/model/vscommerce/payment-methods.model';
import { PaymentMethodsService } from './payment-methods.service';

@Component({
  templateUrl: './payment-methods-delete-dialog.component.html',
})
export class PaymentMethodsDeleteDialogComponent {
  paymentMethods?: IPaymentMethods;

  constructor(
    protected paymentMethodsService: PaymentMethodsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentMethodsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paymentMethodsListModification');
      this.activeModal.close();
    });
  }
}
