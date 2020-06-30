import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWishlistLines } from 'app/shared/model/vscommerce/wishlist-lines.model';

@Component({
  selector: 'jhi-wishlist-lines-detail',
  templateUrl: './wishlist-lines-detail.component.html',
})
export class WishlistLinesDetailComponent implements OnInit {
  wishlistLines: IWishlistLines | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wishlistLines }) => (this.wishlistLines = wishlistLines));
  }

  previousState(): void {
    window.history.back();
  }
}
