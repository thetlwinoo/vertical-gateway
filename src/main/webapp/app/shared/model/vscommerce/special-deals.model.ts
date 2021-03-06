import { Moment } from 'moment';
import { IShoppingCarts } from 'app/shared/model/vscommerce/shopping-carts.model';
import { IOrders } from 'app/shared/model/vscommerce/orders.model';
import { IOrderPackages } from 'app/shared/model/vscommerce/order-packages.model';

export interface ISpecialDeals {
  id?: number;
  dealDescription?: string;
  startDate?: Moment;
  endDate?: Moment;
  discountAmount?: number;
  discountPercentage?: number;
  discountCode?: string;
  unitPrice?: number;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  cartLists?: IShoppingCarts[];
  orderLists?: IOrders[];
  orderPackageLists?: IOrderPackages[];
  buyingGroupName?: string;
  buyingGroupId?: number;
  customerCategoryName?: string;
  customerCategoryId?: number;
  customerName?: string;
  customerId?: number;
  productCategoryName?: string;
  productCategoryId?: number;
  stockItemId?: number;
}

export class SpecialDeals implements ISpecialDeals {
  constructor(
    public id?: number,
    public dealDescription?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public discountAmount?: number,
    public discountPercentage?: number,
    public discountCode?: string,
    public unitPrice?: number,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public cartLists?: IShoppingCarts[],
    public orderLists?: IOrders[],
    public orderPackageLists?: IOrderPackages[],
    public buyingGroupName?: string,
    public buyingGroupId?: number,
    public customerCategoryName?: string,
    public customerCategoryId?: number,
    public customerName?: string,
    public customerId?: number,
    public productCategoryName?: string,
    public productCategoryId?: number,
    public stockItemId?: number
  ) {}
}
