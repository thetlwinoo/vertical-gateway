import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IWishlistLines, WishlistLines } from 'app/shared/model/vscommerce/wishlist-lines.model';
import { WishlistLinesService } from './wishlist-lines.service';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from 'app/entities/vscommerce/stock-items/stock-items.service';
import { IWishlists } from 'app/shared/model/vscommerce/wishlists.model';
import { WishlistsService } from 'app/entities/vscommerce/wishlists/wishlists.service';

type SelectableEntity = IStockItems | IWishlists;

@Component({
  selector: 'jhi-wishlist-lines-update',
  templateUrl: './wishlist-lines-update.component.html',
})
export class WishlistLinesUpdateComponent implements OnInit {
  isSaving = false;
  stockitems: IStockItems[] = [];
  wishlists: IWishlists[] = [];

  editForm = this.fb.group({
    id: [],
    stockItemId: [],
    wishlistId: [],
  });

  constructor(
    protected wishlistLinesService: WishlistLinesService,
    protected stockItemsService: StockItemsService,
    protected wishlistsService: WishlistsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wishlistLines }) => {
      this.updateForm(wishlistLines);

      this.stockItemsService.query().subscribe((res: HttpResponse<IStockItems[]>) => (this.stockitems = res.body || []));

      this.wishlistsService.query().subscribe((res: HttpResponse<IWishlists[]>) => (this.wishlists = res.body || []));
    });
  }

  updateForm(wishlistLines: IWishlistLines): void {
    this.editForm.patchValue({
      id: wishlistLines.id,
      stockItemId: wishlistLines.stockItemId,
      wishlistId: wishlistLines.wishlistId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wishlistLines = this.createFromForm();
    if (wishlistLines.id !== undefined) {
      this.subscribeToSaveResponse(this.wishlistLinesService.update(wishlistLines));
    } else {
      this.subscribeToSaveResponse(this.wishlistLinesService.create(wishlistLines));
    }
  }

  private createFromForm(): IWishlistLines {
    return {
      ...new WishlistLines(),
      id: this.editForm.get(['id'])!.value,
      stockItemId: this.editForm.get(['stockItemId'])!.value,
      wishlistId: this.editForm.get(['wishlistId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWishlistLines>>): void {
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
