import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IWishlists } from 'app/shared/model/vscommerce/wishlists.model';
import { WishlistsService } from './wishlists.service';
import { WishlistsDeleteDialogComponent } from './wishlists-delete-dialog.component';

@Component({
  selector: 'jhi-wishlists',
  templateUrl: './wishlists.component.html',
})
export class WishlistsComponent implements OnInit, OnDestroy {
  wishlists?: IWishlists[];
  eventSubscriber?: Subscription;

  constructor(protected wishlistsService: WishlistsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.wishlistsService.query().subscribe((res: HttpResponse<IWishlists[]>) => (this.wishlists = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInWishlists();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IWishlists): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInWishlists(): void {
    this.eventSubscriber = this.eventManager.subscribe('wishlistsListModification', () => this.loadAll());
  }

  delete(wishlists: IWishlists): void {
    const modalRef = this.modalService.open(WishlistsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.wishlists = wishlists;
  }
}
