import { Moment } from 'moment';

export interface ISupplierTransactionStatus {
  id?: number;
  name?: string;
  label?: string;
  shortLabel?: string;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
}

export class SupplierTransactionStatus implements ISupplierTransactionStatus {
  constructor(
    public id?: number,
    public name?: string,
    public label?: string,
    public shortLabel?: string,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment
  ) {}
}
