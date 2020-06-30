import { Moment } from 'moment';

export interface ICustomers {
  id?: number;
  accountNumber?: string;
  accountOpenedDate?: Moment;
  standardDiscountPercentage?: number;
  isStatementSent?: boolean;
  isOnCreditHold?: boolean;
  paymentDays?: number;
  deliveryRun?: string;
  runPosition?: string;
  lastEditedBy?: string;
  validFrom?: Moment;
  validTo?: Moment;
  peopleFullName?: string;
  peopleId?: number;
  deliveryMethodName?: string;
  deliveryMethodId?: number;
  deliveryAddressId?: number;
}

export class Customers implements ICustomers {
  constructor(
    public id?: number,
    public accountNumber?: string,
    public accountOpenedDate?: Moment,
    public standardDiscountPercentage?: number,
    public isStatementSent?: boolean,
    public isOnCreditHold?: boolean,
    public paymentDays?: number,
    public deliveryRun?: string,
    public runPosition?: string,
    public lastEditedBy?: string,
    public validFrom?: Moment,
    public validTo?: Moment,
    public peopleFullName?: string,
    public peopleId?: number,
    public deliveryMethodName?: string,
    public deliveryMethodId?: number,
    public deliveryAddressId?: number
  ) {
    this.isStatementSent = this.isStatementSent || false;
    this.isOnCreditHold = this.isOnCreditHold || false;
  }
}
