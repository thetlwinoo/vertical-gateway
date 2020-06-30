import { ICompareLines } from 'app/shared/model/vscommerce/compare-lines.model';

export interface ICompares {
  id?: number;
  compareUserFullName?: string;
  compareUserId?: number;
  compareLineLists?: ICompareLines[];
}

export class Compares implements ICompares {
  constructor(
    public id?: number,
    public compareUserFullName?: string,
    public compareUserId?: number,
    public compareLineLists?: ICompareLines[]
  ) {}
}
