import { Moment } from 'moment';

export interface ICustomerPayment {
  id?: number;
  amountExcludingTax?: number;
  taxAmount?: number;
  transactionAmount?: number;
  outstandingAmount?: number;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  customerTransactionId?: number;
  paymentMethodName?: string;
  paymentMethodId?: number;
  currencyName?: string;
  currencyId?: number;
  currencyRateId?: number;
  customerPaymentCreditCardId?: number;
  customerPaymentVoucherId?: number;
  customerPaymentBankTransferId?: number;
  customerPaymentPaypalId?: number;
}

export class CustomerPayment implements ICustomerPayment {
  constructor(
    public id?: number,
    public amountExcludingTax?: number,
    public taxAmount?: number,
    public transactionAmount?: number,
    public outstandingAmount?: number,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public customerTransactionId?: number,
    public paymentMethodName?: string,
    public paymentMethodId?: number,
    public currencyName?: string,
    public currencyId?: number,
    public currencyRateId?: number,
    public customerPaymentCreditCardId?: number,
    public customerPaymentVoucherId?: number,
    public customerPaymentBankTransferId?: number,
    public customerPaymentPaypalId?: number
  ) {}
}
