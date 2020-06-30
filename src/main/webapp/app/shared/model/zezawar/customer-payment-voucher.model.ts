import { Moment } from 'moment';

export interface ICustomerPaymentVoucher {
  id?: number;
  serialNo?: string;
  amount?: number;
  lastEdityBy?: string;
  lastEditedWhen?: Moment;
  customerPaymentId?: number;
  currencyName?: string;
  currencyId?: number;
}

export class CustomerPaymentVoucher implements ICustomerPaymentVoucher {
  constructor(
    public id?: number,
    public serialNo?: string,
    public amount?: number,
    public lastEdityBy?: string,
    public lastEditedWhen?: Moment,
    public customerPaymentId?: number,
    public currencyName?: string,
    public currencyId?: number
  ) {}
}
