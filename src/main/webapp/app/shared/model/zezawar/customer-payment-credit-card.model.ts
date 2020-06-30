import { Moment } from 'moment';

export interface ICustomerPaymentCreditCard {
  id?: number;
  creditCardNumber?: string;
  creditCardExpiryMonth?: number;
  creditCardExpiryYear?: number;
  amount?: number;
  batchId?: string;
  responseCode?: string;
  approvalCode?: string;
  responseData?: any;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  customerPaymentId?: number;
  currencyName?: string;
  currencyId?: number;
}

export class CustomerPaymentCreditCard implements ICustomerPaymentCreditCard {
  constructor(
    public id?: number,
    public creditCardNumber?: string,
    public creditCardExpiryMonth?: number,
    public creditCardExpiryYear?: number,
    public amount?: number,
    public batchId?: string,
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
