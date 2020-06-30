import { Moment } from 'moment';

export interface IBankAccounts {
  id?: number;
  name?: string;
  branch?: string;
  code?: string;
  number?: string;
  internationalCode?: string;
  lastEditedBy?: string;
  validForm?: Moment;
  validTo?: Moment;
}

export class BankAccounts implements IBankAccounts {
  constructor(
    public id?: number,
    public name?: string,
    public branch?: string,
    public code?: string,
    public number?: string,
    public internationalCode?: string,
    public lastEditedBy?: string,
    public validForm?: Moment,
    public validTo?: Moment
  ) {}
}
