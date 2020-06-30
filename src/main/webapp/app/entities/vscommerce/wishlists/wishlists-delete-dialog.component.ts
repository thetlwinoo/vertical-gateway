import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWishlists } from 'app/shared/model/vscommerce/wishlists.model';
import { WishlistsService } from './wishlists.service';

@Component({
  templateUrl: './wishlists-delete-dialog.component.html',
})
export class WishlistsDeleteDialogComponent {
  wishlists?: IWishlists;

  constructor(protected wishlistsService: WishlistsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wishlistsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('wishlistsListModification');
      this.activeModal.close();
    });
  }
}
