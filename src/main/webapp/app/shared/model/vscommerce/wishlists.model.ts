import { IWishlistLines } from 'app/shared/model/vscommerce/wishlist-lines.model';

export interface IWishlists {
  id?: number;
  wishlistUserId?: number;
  wishlistLineLists?: IWishlistLines[];
}

export class Wishlists implements IWishlists {
  constructor(public id?: number, public wishlistUserId?: number, public wishlistLineLists?: IWishlistLines[]) {}
}
