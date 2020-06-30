import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IShoppingCarts } from 'app/shared/model/vscommerce/shopping-carts.model';

@Component({
  selector: 'jhi-shopping-carts-detail',
  templateUrl: './shopping-carts-detail.component.html',
})
export class ShoppingCartsDetailComponent implements OnInit {
  shoppingCarts: IShoppingCarts | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingCarts }) => (this.shoppingCarts = shoppingCarts));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
