export interface IWishlistLines {
  id?: number;
  stockItemName?: string;
  stockItemId?: number;
  wishlistId?: number;
}

export class WishlistLines implements IWishlistLines {
  constructor(public id?: number, public stockItemName?: string, public stockItemId?: number, public wishlistId?: number) {}
}
