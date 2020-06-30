export interface IPaymentMethods {
  id?: number;
  name?: string;
  code?: string;
  activeInd?: boolean;
  iconFont?: string;
  iconThumbnailUrl?: string;
  iconId?: number;
}

export class PaymentMethods implements IPaymentMethods {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public activeInd?: boolean,
    public iconFont?: string,
    public iconThumbnailUrl?: string,
    public iconId?: number
  ) {
    this.activeInd = this.activeInd || false;
  }
}
