import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShoppingCartItems } from 'app/shared/model/vscommerce/shopping-cart-items.model';
import { ShoppingCartItemsService } from './shopping-cart-items.service';
import { ShoppingCartItemsDeleteDialogComponent } from './shopping-cart-items-delete-dialog.component';

@Component({
  selector: 'jhi-shopping-cart-items',
  templateUrl: './shopping-cart-items.component.html',
})
export class ShoppingCartItemsComponent implements OnInit, OnDestroy {
  shoppingCartItems?: IShoppingCartItems[];
  eventSubscriber?: Subscription;

  constructor(
    protected shoppingCartItemsService: ShoppingCartItemsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.shoppingCartItemsService.query().subscribe((res: HttpResponse<IShoppingCartItems[]>) => (this.shoppingCartItems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShoppingCartItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShoppingCartItems): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShoppingCartItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('shoppingCartItemsListModification', () => this.loadAll());
  }

  delete(shoppingCartItems: IShoppingCartItems): void {
    const modalRef = this.modalService.open(ShoppingCartItemsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shoppingCartItems = shoppingCartItems;
  }
}
