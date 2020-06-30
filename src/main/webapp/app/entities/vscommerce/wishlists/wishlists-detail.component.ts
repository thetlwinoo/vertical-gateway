import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWishlists } from 'app/shared/model/vscommerce/wishlists.model';

@Component({
  selector: 'jhi-wishlists-detail',
  templateUrl: './wishlists-detail.component.html',
})
export class WishlistsDetailComponent implements OnInit {
  wishlists: IWishlists | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wishlists }) => (this.wishlists = wishlists));
  }

  previousState(): void {
    window.history.back();
  }
}
