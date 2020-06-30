import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICustomerCategories } from 'app/shared/model/vscommerce/customer-categories.model';
import { CustomerCategoriesService } from './customer-categories.service';

@Component({
  templateUrl: './customer-categories-delete-dialog.component.html',
})
export class CustomerCategoriesDeleteDialogComponent {
  customerCategories?: ICustomerCategories;

  constructor(
    protected customerCategoriesService: CustomerCategoriesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.customerCategoriesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('customerCategoriesListModification');
      this.activeModal.close();
    });
  }
}
