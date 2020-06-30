import { Moment } from 'moment';

export interface IQuestions {
  id?: number;
  customerQuestion?: any;
  customerQuestionOn?: Moment;
  supplierAnswer?: any;
  supplierAnswerOn?: Moment;
  activeInd?: boolean;
  supplierName?: string;
  supplierId?: number;
  personFullName?: string;
  personId?: number;
  productName?: string;
  productId?: number;
}

export class Questions implements IQuestions {
  constructor(
    public id?: number,
    public customerQuestion?: any,
    public customerQuestionOn?: Moment,
    public supplierAnswer?: any,
    public supplierAnswerOn?: Moment,
    public activeInd?: boolean,
    public supplierName?: string,
    public supplierId?: number,
    public personFullName?: string,
    public personId?: number,
    public productName?: string,
    public productId?: number
  ) {
    this.activeInd = this.activeInd || false;
  }
}
