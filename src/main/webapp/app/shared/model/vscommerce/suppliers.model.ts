import { Moment } from 'moment';
import { IDeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';

export interface ISuppliers {
  id?: number;
  name?: string;
  supplierReference?: string;
  bankAccountName?: string;
  bankAccountBranch?: string;
  bankAccountCode?: string;
  bankAccountNumber?: string;
  bankInternationalCode?: string;
  paymentDays?: number;
  internalComments?: string;
  phoneNumber?: string;
  faxNumber?: string;
  websiteURL?: string;
  webServiceUrl?: string;
  creditRating?: number;
  activeFlag?: boolean;
  thumbnailUrl?: string;
  pickupSameAsHeadOffice?: boolean;
  validFrom?: Moment;
  validTo?: Moment;
  peopleFullName?: string;
  peopleId?: number;
  supplierCategoryName?: string;
  supplierCategoryId?: number;
  pickupAddressId?: number;
  headOfficeAddressId?: number;
  deliveryMethods?: IDeliveryMethods[];
}

export class Suppliers implements ISuppliers {
  constructor(
    public id?: number,
    public name?: string,
    public supplierReference?: string,
    public bankAccountName?: string,
    public bankAccountBranch?: string,
    public bankAccountCode?: string,
    public bankAccountNumber?: string,
    public bankInternationalCode?: string,
    public paymentDays?: number,
    public internalComments?: string,
    public phoneNumber?: string,
    public faxNumber?: string,
    public websiteURL?: string,
    public webServiceUrl?: string,
    public creditRating?: number,
    public activeFlag?: boolean,
    public thumbnailUrl?: string,
    public pickupSameAsHeadOffice?: boolean,
    public validFrom?: Moment,
    public validTo?: Moment,
    public peopleFullName?: string,
    public peopleId?: number,
    public supplierCategoryName?: string,
    public supplierCategoryId?: number,
    public pickupAddressId?: number,
    public headOfficeAddressId?: number,
    public deliveryMethods?: IDeliveryMethods[]
  ) {
    this.activeFlag = this.activeFlag || false;
    this.pickupSameAsHeadOffice = this.pickupSameAsHeadOffice || false;
  }
}
