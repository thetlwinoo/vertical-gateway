import { Moment } from 'moment';

export interface ICustomerPaymentCreditCardExtended {
  id?: number;
  errorCode?: string;
  errorMessage?: string;
  lastEditedBy?: string;
  lastEditeWhen?: Moment;
}

export class CustomerPaymentCreditCardExtended implements ICustomerPaymentCreditCardExtended {
  constructor(
    public id?: number,
    public errorCode?: string,
    public errorMessage?: string,
    public lastEditedBy?: string,
    public lastEditeWhen?: Moment
  ) {}
}
