import { Moment } from 'moment';

export interface ICustomerPaymentPaypal {
  id?: number;
  paypalAccount?: string;
  amount?: number;
  responseCode?: string;
  approvalCode?: string;
  responseData?: any;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  customerPaymentId?: number;
  currencyName?: string;
  currencyId?: number;
}

export class CustomerPaymentPaypal implements ICustomerPaymentPaypal {
  constructor(
    public id?: number,
    public paypalAccount?: string,
    public amount?: number,
    public responseCode?: string,
    public approvalCode?: string,
    public responseData?: any,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public customerPaymentId?: number,
    public currencyName?: string,
    public currencyId?: number
  ) {}
}
