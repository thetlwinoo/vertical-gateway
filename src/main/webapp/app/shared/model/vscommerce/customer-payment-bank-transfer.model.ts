import { Moment } from 'moment';

export interface ICustomerPaymentBankTransfer {
  id?: number;
  receiptImageUrl?: string;
  nameInBankAccount?: string;
  dateOfTransfer?: Moment;
  amountTransferred?: number;
  lastEdityBy?: string;
  lastEditedWhen?: Moment;
  customerPaymentId?: number;
  currencyName?: string;
  currencyId?: number;
}

export class CustomerPaymentBankTransfer implements ICustomerPaymentBankTransfer {
  constructor(
    public id?: number,
    public receiptImageUrl?: string,
    public nameInBankAccount?: string,
    public dateOfTransfer?: Moment,
    public amountTransferred?: number,
    public lastEdityBy?: string,
    public lastEditedWhen?: Moment,
    public customerPaymentId?: number,
    public currencyName?: string,
    public currencyId?: number
  ) {}
}
