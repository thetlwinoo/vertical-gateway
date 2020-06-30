import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWishlistLines } from 'app/shared/model/vscommerce/wishlist-lines.model';
import { WishlistLinesService } from './wishlist-lines.service';

@Component({
  templateUrl: './wishlist-lines-delete-dialog.component.html',
})
export class WishlistLinesDeleteDialogComponent {
  wishlistLines?: IWishlistLines;

  constructor(
    protected wishlistLinesService: WishlistLinesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.wishlistLinesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('wishlistLinesListModification');
      this.activeModal.close();
    });
  }
}
