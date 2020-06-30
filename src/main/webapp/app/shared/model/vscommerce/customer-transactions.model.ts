import { Moment } from 'moment';

export interface ICustomerTransactions {
  id?: number;
  transactionDate?: Moment;
  amountExcludingTax?: number;
  taxAmount?: number;
  transactionAmount?: number;
  outstandingBalance?: number;
  finalizationDate?: Moment;
  isFinalized?: boolean;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  customerName?: string;
  customerId?: number;
  paymentMethodId?: number;
  transactionTypeName?: string;
  transactionTypeId?: number;
  invoiceId?: number;
  orderId?: number;
  customerPaymentId?: number;
}

export class CustomerTransactions implements ICustomerTransactions {
  constructor(
    public id?: number,
    public transactionDate?: Moment,
    public amountExcludingTax?: number,
    public taxAmount?: number,
    public transactionAmount?: number,
    public outstandingBalance?: number,
    public finalizationDate?: Moment,
    public isFinalized?: boolean,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public customerName?: string,
    public customerId?: number,
    public paymentMethodId?: number,
    public transactionTypeName?: string,
    public transactionTypeId?: number,
    public invoiceId?: number,
    public orderId?: number,
    public customerPaymentId?: number
  ) {
    this.isFinalized = this.isFinalized || false;
  }
}
