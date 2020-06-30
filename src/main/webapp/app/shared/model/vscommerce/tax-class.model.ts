export interface ITaxClass {
  id?: number;
  code?: string;
  name?: string;
}

export class TaxClass implements ITaxClass {
  constructor(public id?: number, public code?: string, public name?: string) {}
}
