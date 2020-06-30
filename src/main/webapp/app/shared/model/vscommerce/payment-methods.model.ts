export interface IPaymentMethods {
  id?: number;
  name?: string;
  code?: string;
  disabled?: boolean;
  activeInd?: boolean;
  sortOrder?: number;
  iconFont?: string;
  iconThumbnailUrl?: string;
  iconId?: number;
}

export class PaymentMethods implements IPaymentMethods {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public disabled?: boolean,
    public activeInd?: boolean,
    public sortOrder?: number,
    public iconFont?: string,
    public iconThumbnailUrl?: string,
    public iconId?: number
  ) {
    this.disabled = this.disabled || false;
    this.activeInd = this.activeInd || false;
  }
}
