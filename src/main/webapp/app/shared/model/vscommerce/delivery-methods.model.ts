import { Moment } from 'moment';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';

export interface IDeliveryMethods {
  id?: number;
  name?: string;
  thirdPartyName?: string;
  expectedMinArrivalDays?: number;
  expectedMaxArrivalDays?: number;
  activeInd?: boolean;
  defaultInd?: boolean;
  deliveryNote?: string;
  validFrom?: Moment;
  validTo?: Moment;
  suppliers?: ISuppliers[];
}

export class DeliveryMethods implements IDeliveryMethods {
  constructor(
    public id?: number,
    public name?: string,
    public thirdPartyName?: string,
    public expectedMinArrivalDays?: number,
    public expectedMaxArrivalDays?: number,
    public activeInd?: boolean,
    public defaultInd?: boolean,
    public deliveryNote?: string,
    public validFrom?: Moment,
    public validTo?: Moment,
    public suppliers?: ISuppliers[]
  ) {
    this.activeInd = this.activeInd || false;
    this.defaultInd = this.defaultInd || false;
  }
}
