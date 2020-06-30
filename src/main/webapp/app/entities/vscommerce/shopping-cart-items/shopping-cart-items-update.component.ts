import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IShoppingCartItems, ShoppingCartItems } from 'app/shared/model/vscommerce/shopping-cart-items.model';
import { ShoppingCartItemsService } from './shopping-cart-items.service';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from 'app/entities/vscommerce/stock-items/stock-items.service';
import { IDeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';
import { DeliveryMethodsService } from 'app/entities/vscommerce/delivery-methods/delivery-methods.service';
import { IShoppingCarts } from 'app/shared/model/vscommerce/shopping-carts.model';
import { ShoppingCartsService } from 'app/entities/vscommerce/shopping-carts/shopping-carts.service';

type SelectableEntity = IStockItems | IDeliveryMethods | IShoppingCarts;

@Component({
  selector: 'jhi-shopping-cart-items-update',
  templateUrl: './shopping-cart-items-update.component.html',
})
export class ShoppingCartItemsUpdateComponent implements OnInit {
  isSaving = false;
  stockitems: IStockItems[] = [];
  deliverymethods: IDeliveryMethods[] = [];
  shoppingcarts: IShoppingCarts[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    selectOrder: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    stockItemId: [],
    deliveryMethodId: [],
    cartId: [],
  });

  constructor(
    protected shoppingCartItemsService: ShoppingCartItemsService,
    protected stockItemsService: StockItemsService,
    protected deliveryMethodsService: DeliveryMethodsService,
    protected shoppingCartsService: ShoppingCartsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingCartItems }) => {
      if (!shoppingCartItems.id) {
        const today = moment().startOf('day');
        shoppingCartItems.lastEditedWhen = today;
      }

      this.updateForm(shoppingCartItems);

      this.stockItemsService.query().subscribe((res: HttpResponse<IStockItems[]>) => (this.stockitems = res.body || []));

      this.deliveryMethodsService.query().subscribe((res: HttpResponse<IDeliveryMethods[]>) => (this.deliverymethods = res.body || []));

      this.shoppingCartsService.query().subscribe((res: HttpResponse<IShoppingCarts[]>) => (this.shoppingcarts = res.body || []));
    });
  }

  updateForm(shoppingCartItems: IShoppingCartItems): void {
    this.editForm.patchValue({
      id: shoppingCartItems.id,
      quantity: shoppingCartItems.quantity,
      selectOrder: shoppingCartItems.selectOrder,
      lastEditedBy: shoppingCartItems.lastEditedBy,
      lastEditedWhen: shoppingCartItems.lastEditedWhen ? shoppingCartItems.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      stockItemId: shoppingCartItems.stockItemId,
      deliveryMethodId: shoppingCartItems.deliveryMethodId,
      cartId: shoppingCartItems.cartId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shoppingCartItems = this.createFromForm();
    if (shoppingCartItems.id !== undefined) {
      this.subscribeToSaveResponse(this.shoppingCartItemsService.update(shoppingCartItems));
    } else {
      this.subscribeToSaveResponse(this.shoppingCartItemsService.create(shoppingCartItems));
    }
  }

  private createFromForm(): IShoppingCartItems {
    return {
      ...new ShoppingCartItems(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      selectOrder: this.editForm.get(['selectOrder'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      stockItemId: this.editForm.get(['stockItemId'])!.value,
      deliveryMethodId: this.editForm.get(['deliveryMethodId'])!.value,
      cartId: this.editForm.get(['cartId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShoppingCartItems>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
