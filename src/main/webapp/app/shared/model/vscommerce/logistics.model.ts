import { Moment } from 'moment';

export interface ILogistics {
  id?: number;
  name?: string;
  activeInd?: boolean;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
}

export class Logistics implements ILogistics {
  constructor(
    public id?: number,
    public name?: string,
    public activeInd?: boolean,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment
  ) {
    this.activeInd = this.activeInd || false;
  }
}
