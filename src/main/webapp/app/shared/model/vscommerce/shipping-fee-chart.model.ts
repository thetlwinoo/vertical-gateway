import { Moment } from 'moment';

export interface IShippingFeeChart {
  id?: number;
  sizeOfPercel?: string;
  minVolumeWeight?: number;
  maxVolumeWeight?: number;
  minActualWeight?: number;
  maxActualWeight?: number;
  price?: number;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  zoneCode?: string;
  zoneId?: number;
  deliveryMethodName?: string;
  deliveryMethodId?: number;
}

export class ShippingFeeChart implements IShippingFeeChart {
  constructor(
    public id?: number,
    public sizeOfPercel?: string,
    public minVolumeWeight?: number,
    public maxVolumeWeight?: number,
    public minActualWeight?: number,
    public maxActualWeight?: number,
    public price?: number,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public zoneCode?: string,
    public zoneId?: number,
    public deliveryMethodName?: string,
    public deliveryMethodId?: number
  ) {}
}
