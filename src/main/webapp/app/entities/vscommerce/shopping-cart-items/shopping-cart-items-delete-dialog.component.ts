import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShoppingCartItems } from 'app/shared/model/vscommerce/shopping-cart-items.model';
import { ShoppingCartItemsService } from './shopping-cart-items.service';

@Component({
  templateUrl: './shopping-cart-items-delete-dialog.component.html',
})
export class ShoppingCartItemsDeleteDialogComponent {
  shoppingCartItems?: IShoppingCartItems;

  constructor(
    protected shoppingCartItemsService: ShoppingCartItemsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shoppingCartItemsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('shoppingCartItemsListModification');
      this.activeModal.close();
    });
  }
}
