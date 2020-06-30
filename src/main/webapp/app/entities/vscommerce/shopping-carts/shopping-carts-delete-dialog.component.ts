import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShoppingCarts } from 'app/shared/model/vscommerce/shopping-carts.model';
import { ShoppingCartsService } from './shopping-carts.service';

@Component({
  templateUrl: './shopping-carts-delete-dialog.component.html',
})
export class ShoppingCartsDeleteDialogComponent {
  shoppingCarts?: IShoppingCarts;

  constructor(
    protected shoppingCartsService: ShoppingCartsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shoppingCartsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('shoppingCartsListModification');
      this.activeModal.close();
    });
  }
}
