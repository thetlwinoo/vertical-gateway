export interface ICompareLines {
  id?: number;
  stockItemName?: string;
  stockItemId?: number;
  compareId?: number;
}

export class CompareLines implements ICompareLines {
  constructor(public id?: number, public stockItemName?: string, public stockItemId?: number, public compareId?: number) {}
}
