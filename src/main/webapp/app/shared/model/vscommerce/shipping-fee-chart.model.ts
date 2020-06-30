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
  sourceZoneCode?: string;
  sourceZoneId?: number;
  destinationZoneCode?: string;
  destinationZoneId?: number;
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
    public sourceZoneCode?: string,
    public sourceZoneId?: number,
    public destinationZoneCode?: string,
    public destinationZoneId?: number,
    public deliveryMethodName?: string,
    public deliveryMethodId?: number
  ) {}
}
