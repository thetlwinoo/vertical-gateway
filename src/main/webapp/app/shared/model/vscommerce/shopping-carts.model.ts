import { Moment } from 'moment';
import { IShoppingCartItems } from 'app/shared/model/vscommerce/shopping-cart-items.model';

export interface IShoppingCarts {
  id?: number;
  totalPrice?: number;
  subTotalPrice?: number;
  totalShippingFee?: number;
  totalShippingFeeDiscount?: number;
  promotionTotal?: number;
  voucherTotal?: number;
  packageDetails?: any;
  cartString?: any;
  dealString?: any;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  cartUserFullName?: string;
  cartUserId?: number;
  cartItemLists?: IShoppingCartItems[];
  customerName?: string;
  customerId?: number;
  specialDealsId?: number;
}

export class ShoppingCarts implements IShoppingCarts {
  constructor(
    public id?: number,
    public totalPrice?: number,
    public subTotalPrice?: number,
    public totalShippingFee?: number,
    public totalShippingFeeDiscount?: number,
    public promotionTotal?: number,
    public voucherTotal?: number,
    public packageDetails?: any,
    public cartString?: any,
    public dealString?: any,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public cartUserFullName?: string,
    public cartUserId?: number,
    public cartItemLists?: IShoppingCartItems[],
    public customerName?: string,
    public customerId?: number,
    public specialDealsId?: number
  ) {}
}
