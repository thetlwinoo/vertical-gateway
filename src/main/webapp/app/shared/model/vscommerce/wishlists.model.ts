import { IWishlistLines } from 'app/shared/model/vscommerce/wishlist-lines.model';

export interface IWishlists {
  id?: number;
  wishlistUserFullName?: string;
  wishlistUserId?: number;
  wishlistLineLists?: IWishlistLines[];
}

export class Wishlists implements IWishlists {
  constructor(
    public id?: number,
    public wishlistUserFullName?: string,
    public wishlistUserId?: number,
    public wishlistLineLists?: IWishlistLines[]
  ) {}
}
