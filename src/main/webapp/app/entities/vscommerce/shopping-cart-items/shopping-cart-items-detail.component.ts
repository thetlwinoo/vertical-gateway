import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShoppingCartItems } from 'app/shared/model/vscommerce/shopping-cart-items.model';

@Component({
  selector: 'jhi-shopping-cart-items-detail',
  templateUrl: './shopping-cart-items-detail.component.html',
})
export class ShoppingCartItemsDetailComponent implements OnInit {
  shoppingCartItems: IShoppingCartItems | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingCartItems }) => (this.shoppingCartItems = shoppingCartItems));
  }

  previousState(): void {
    window.history.back();
  }
}
