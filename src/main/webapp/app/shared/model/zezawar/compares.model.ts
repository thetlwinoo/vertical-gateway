import { ICompareLines } from 'app/shared/model/zezawar/compare-lines.model';

export interface ICompares {
  id?: number;
  compareUserId?: number;
  compareLineLists?: ICompareLines[];
}

export class Compares implements ICompares {
  constructor(public id?: number, public compareUserId?: number, public compareLineLists?: ICompareLines[]) {}
}
