import { Moment } from 'moment';
import { IOrderPackages } from 'app/shared/model/vscommerce/order-packages.model';
import { PaymentStatus } from 'app/shared/model/enumerations/payment-status.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrders {
  id?: number;
  orderDate?: Moment;
  subTotal?: number;
  totalTaxAmount?: number;
  totalShippingFee?: number;
  totalShippingFeeDiscount?: number;
  totalVoucherDiscount?: number;
  totalPromtionDiscount?: number;
  totalDue?: number;
  paymentStatus?: PaymentStatus;
  customerPurchaseOrderNumber?: string;
  status?: OrderStatus;
  orderDetails?: any;
  isUnderSupplyBackOrdered?: boolean;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  orderPackageLists?: IOrderPackages[];
  customerName?: string;
  customerId?: number;
  shipToAddressId?: number;
  billToAddressId?: number;
  currencyRateId?: number;
  paymentMethodName?: string;
  paymentMethodId?: number;
  salePersonFullName?: string;
  salePersonId?: number;
  orderTrackingId?: number;
  specialDealsId?: number;
}

export class Orders implements IOrders {
  constructor(
    public id?: number,
    public orderDate?: Moment,
    public subTotal?: number,
    public totalTaxAmount?: number,
    public totalShippingFee?: number,
    public totalShippingFeeDiscount?: number,
    public totalVoucherDiscount?: number,
    public totalPromtionDiscount?: number,
    public totalDue?: number,
    public paymentStatus?: PaymentStatus,
    public customerPurchaseOrderNumber?: string,
    public status?: OrderStatus,
    public orderDetails?: any,
    public isUnderSupplyBackOrdered?: boolean,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public orderPackageLists?: IOrderPackages[],
    public customerName?: string,
    public customerId?: number,
    public shipToAddressId?: number,
    public billToAddressId?: number,
    public currencyRateId?: number,
    public paymentMethodName?: string,
    public paymentMethodId?: number,
    public salePersonFullName?: string,
    public salePersonId?: number,
    public orderTrackingId?: number,
    public specialDealsId?: number
  ) {
    this.isUnderSupplyBackOrdered = this.isUnderSupplyBackOrdered || false;
  }
}
