import { Moment } from 'moment';

export interface IShoppingCartItems {
  id?: number;
  quantity?: number;
  selectOrder?: boolean;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  stockItemName?: string;
  stockItemId?: number;
  deliveryMethodName?: string;
  deliveryMethodId?: number;
  cartId?: number;
}

export class ShoppingCartItems implements IShoppingCartItems {
  constructor(
    public id?: number,
    public quantity?: number,
    public selectOrder?: boolean,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public stockItemName?: string,
    public stockItemId?: number,
    public deliveryMethodName?: string,
    public deliveryMethodId?: number,
    public cartId?: number
  ) {
    this.selectOrder = this.selectOrder || false;
  }
}
