import { Moment } from 'moment';
import { IInvoiceLines } from 'app/shared/model/vscommerce/invoice-lines.model';
import { InvoiceStatus } from 'app/shared/model/enumerations/invoice-status.model';

export interface IInvoices {
  id?: number;
  invoiceDate?: Moment;
  customerPurchaseOrderNumber?: string;
  isCreditNote?: boolean;
  creditNoteReason?: string;
  comments?: string;
  deliveryInstructions?: string;
  internalComments?: string;
  totalDryItems?: number;
  totalChillerItems?: number;
  deliveryRun?: string;
  runPosition?: string;
  returnedDeliveryData?: any;
  confirmedDeliveryTime?: Moment;
  confirmedReceivedBy?: string;
  status?: InvoiceStatus;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  invoiceLineLists?: IInvoiceLines[];
  contactPersonFullName?: string;
  contactPersonId?: number;
  salesPersonFullName?: string;
  salesPersonId?: number;
  packedByPersonFullName?: string;
  packedByPersonId?: number;
  accountsPersonFullName?: string;
  accountsPersonId?: number;
  customerName?: string;
  customerId?: number;
  billToCustomerName?: string;
  billToCustomerId?: number;
  deliveryMethodName?: string;
  deliveryMethodId?: number;
  orderId?: number;
  orderPackageId?: number;
  paymentMethodId?: number;
}

export class Invoices implements IInvoices {
  constructor(
    public id?: number,
    public invoiceDate?: Moment,
    public customerPurchaseOrderNumber?: string,
    public isCreditNote?: boolean,
    public creditNoteReason?: string,
    public comments?: string,
    public deliveryInstructions?: string,
    public internalComments?: string,
    public totalDryItems?: number,
    public totalChillerItems?: number,
    public deliveryRun?: string,
    public runPosition?: string,
    public returnedDeliveryData?: any,
    public confirmedDeliveryTime?: Moment,
    public confirmedReceivedBy?: string,
    public status?: InvoiceStatus,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public invoiceLineLists?: IInvoiceLines[],
    public contactPersonFullName?: string,
    public contactPersonId?: number,
    public salesPersonFullName?: string,
    public salesPersonId?: number,
    public packedByPersonFullName?: string,
    public packedByPersonId?: number,
    public accountsPersonFullName?: string,
    public accountsPersonId?: number,
    public customerName?: string,
    public customerId?: number,
    public billToCustomerName?: string,
    public billToCustomerId?: number,
    public deliveryMethodName?: string,
    public deliveryMethodId?: number,
    public orderId?: number,
    public orderPackageId?: number,
    public paymentMethodId?: number
  ) {
    this.isCreditNote = this.isCreditNote || false;
  }
}
