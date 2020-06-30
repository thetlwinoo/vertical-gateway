import { Moment } from 'moment';

export interface IZone {
  id?: number;
  code?: string;
  name?: string;
  validFrom?: Moment;
  validTo?: Moment;
  cityName?: string;
  cityId?: number;
}

export class Zone implements IZone {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public validFrom?: Moment,
    public validTo?: Moment,
    public cityName?: string,
    public cityId?: number
  ) {}
}
