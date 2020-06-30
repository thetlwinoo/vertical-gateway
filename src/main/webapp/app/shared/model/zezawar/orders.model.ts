import { Moment } from 'moment';
import { IOrderLines } from 'app/shared/model/zezawar/order-lines.model';
import { PaymentStatus } from 'app/shared/model/enumerations/payment-status.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrders {
  id?: number;
  orderDate?: Moment;
  dueDate?: Moment;
  expectedDeliveryDate?: Moment;
  paymentStatus?: PaymentStatus;
  accountNumber?: string;
  subTotal?: number;
  taxAmount?: number;
  frieight?: number;
  totalDue?: number;
  comments?: string;
  deliveryInstructions?: string;
  internalComments?: string;
  pickingCompletedWhen?: Moment;
  status?: OrderStatus;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  reviewId?: number;
  orderLineLists?: IOrderLines[];
  customerId?: number;
  shipToAddressId?: number;
  billToAddressId?: number;
  shipMethodName?: string;
  shipMethodId?: number;
  currencyRateId?: number;
  customerTransactionId?: number;
  orderTrackingId?: number;
  specialDealsId?: number;
}

export class Orders implements IOrders {
  constructor(
    public id?: number,
    public orderDate?: Moment,
    public dueDate?: Moment,
    public expectedDeliveryDate?: Moment,
    public paymentStatus?: PaymentStatus,
    public accountNumber?: string,
    public subTotal?: number,
    public taxAmount?: number,
    public frieight?: number,
    public totalDue?: number,
    public comments?: string,
    public deliveryInstructions?: string,
    public internalComments?: string,
    public pickingCompletedWhen?: Moment,
    public status?: OrderStatus,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public reviewId?: number,
    public orderLineLists?: IOrderLines[],
    public customerId?: number,
    public shipToAddressId?: number,
    public billToAddressId?: number,
    public shipMethodName?: string,
    public shipMethodId?: number,
    public currencyRateId?: number,
    public customerTransactionId?: number,
    public orderTrackingId?: number,
    public specialDealsId?: number
  ) {}
}
