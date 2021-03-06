import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShoppingCarts } from 'app/shared/model/vscommerce/shopping-carts.model';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsDeleteDialogComponent } from './shopping-carts-delete-dialog.component';

@Component({
  selector: 'jhi-shopping-carts',
  templateUrl: './shopping-carts.component.html',
})
export class ShoppingCartsComponent implements OnInit, OnDestroy {
  shoppingCarts?: IShoppingCarts[];
  eventSubscriber?: Subscription;

  constructor(
    protected shoppingCartsService: ShoppingCartsService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.shoppingCartsService.query().subscribe((res: HttpResponse<IShoppingCarts[]>) => (this.shoppingCarts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShoppingCarts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShoppingCarts): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInShoppingCarts(): void {
    this.eventSubscriber = this.eventManager.subscribe('shoppingCartsListModification', () => this.loadAll());
  }

  delete(shoppingCarts: IShoppingCarts): void {
    const modalRef = this.modalService.open(ShoppingCartsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shoppingCarts = shoppingCarts;
  }
}
