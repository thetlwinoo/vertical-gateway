import { Moment } from 'moment';

export interface IUploadTransactions {
  id?: number;
  fileName?: string;
  importedTemplateContentType?: string;
  importedTemplate?: any;
  importedFailedTemplateContentType?: string;
  importedFailedTemplate?: any;
  status?: number;
  generatedCode?: string;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  supplierName?: string;
  supplierId?: number;
  actionTypeName?: string;
  actionTypeId?: number;
}

export class UploadTransactions implements IUploadTransactions {
  constructor(
    public id?: number,
    public fileName?: string,
    public importedTemplateContentType?: string,
    public importedTemplate?: any,
    public importedFailedTemplateContentType?: string,
    public importedFailedTemplate?: any,
    public status?: number,
    public generatedCode?: string,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public supplierName?: string,
    public supplierId?: number,
    public actionTypeName?: string,
    public actionTypeId?: number
  ) {}
}
