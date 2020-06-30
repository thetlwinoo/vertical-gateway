import { Moment } from 'moment';
import { IShoppingCartItems } from 'app/shared/model/vscommerce/shopping-cart-items.model';

export interface IShoppingCarts {
  id?: number;
  totalPrice?: number;
  totalCargoPrice?: number;
  cartString?: any;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  cartUserId?: number;
  cartItemLists?: IShoppingCartItems[];
  customerId?: number;
  specialDealsId?: number;
}

export class ShoppingCarts implements IShoppingCarts {
  constructor(
    public id?: number,
    public totalPrice?: number,
    public totalCargoPrice?: number,
    public cartString?: any,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public cartUserId?: number,
    public cartItemLists?: IShoppingCartItems[],
    public customerId?: number,
    public specialDealsId?: number
  ) {}
}
