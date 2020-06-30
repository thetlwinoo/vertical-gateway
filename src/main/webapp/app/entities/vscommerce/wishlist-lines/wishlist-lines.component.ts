import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWishlistLines } from 'app/shared/model/vscommerce/wishlist-lines.model';
import { WishlistLinesService } from './wishlist-lines.service';
import { WishlistLinesDeleteDialogComponent } from './wishlist-lines-delete-dialog.component';

@Component({
  selector: 'jhi-wishlist-lines',
  templateUrl: './wishlist-lines.component.html',
})
export class WishlistLinesComponent implements OnInit, OnDestroy {
  wishlistLines?: IWishlistLines[];
  eventSubscriber?: Subscription;

  constructor(
    protected wishlistLinesService: WishlistLinesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.wishlistLinesService.query().subscribe((res: HttpResponse<IWishlistLines[]>) => (this.wishlistLines = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWishlistLines();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWishlistLines): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWishlistLines(): void {
    this.eventSubscriber = this.eventManager.subscribe('wishlistLinesListModification', () => this.loadAll());
  }

  delete(wishlistLines: IWishlistLines): void {
    const modalRef = this.modalService.open(WishlistLinesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.wishlistLines = wishlistLines;
  }
}
