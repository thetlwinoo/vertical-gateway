import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISuppliers, Suppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from './suppliers.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { ISupplierCategories } from 'app/shared/model/vscommerce/supplier-categories.model';
import { SupplierCategoriesService } from 'app/entities/vscommerce/supplier-categories/supplier-categories.service';
import { IAddresses } from 'app/shared/model/vscommerce/addresses.model';
import { AddressesService } from 'app/entities/vscommerce/addresses/addresses.service';
import { IDeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';
import { DeliveryMethodsService } from 'app/entities/vscommerce/delivery-methods/delivery-methods.service';

type SelectableEntity = IPeople | ISupplierCategories | IAddresses | IDeliveryMethods;

@Component({
  selector: 'jhi-suppliers-update',
  templateUrl: './suppliers-update.component.html',
})
export class SuppliersUpdateComponent implements OnInit {
  isSaving = false;
  people: IPeople[] = [];
  suppliercategories: ISupplierCategories[] = [];
  addresses: IAddresses[] = [];
  deliverymethods: IDeliveryMethods[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    supplierReference: [],
    bankAccountName: [],
    bankAccountBranch: [],
    bankAccountCode: [],
    bankAccountNumber: [],
    bankInternationalCode: [],
    paymentDays: [null, [Validators.required]],
    internalComments: [],
    phoneNumber: [null, [Validators.required]],
    faxNumber: [],
    websiteURL: [],
    webServiceUrl: [],
    creditRating: [],
    activeFlag: [],
    thumbnailUrl: [],
    pickupSameAsHeadOffice: [],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
    peopleId: [],
    supplierCategoryId: [],
    pickupAddressId: [],
    headOfficeAddressId: [],
    deliveryMethods: [],
  });

  constructor(
    protected suppliersService: SuppliersService,
    protected peopleService: PeopleService,
    protected supplierCategoriesService: SupplierCategoriesService,
    protected addressesService: AddressesService,
    protected deliveryMethodsService: DeliveryMethodsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ suppliers }) => {
      if (!suppliers.id) {
        const today = moment().startOf('day');
        suppliers.validFrom = today;
        suppliers.validTo = today;
      }

      this.updateForm(suppliers);

      this.peopleService
        .query({ 'suppliersId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IPeople[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPeople[]) => {
          if (!suppliers.peopleId) {
            this.people = resBody;
          } else {
            this.peopleService
              .find(suppliers.peopleId)
              .pipe(
                map((subRes: HttpResponse<IPeople>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPeople[]) => (this.people = concatRes));
          }
        });

      this.supplierCategoriesService
        .query()
        .subscribe((res: HttpResponse<ISupplierCategories[]>) => (this.suppliercategories = res.body || []));

      this.addressesService.query().subscribe((res: HttpResponse<IAddresses[]>) => (this.addresses = res.body || []));

      this.deliveryMethodsService.query().subscribe((res: HttpResponse<IDeliveryMethods[]>) => (this.deliverymethods = res.body || []));
    });
  }

  updateForm(suppliers: ISuppliers): void {
    this.editForm.patchValue({
      id: suppliers.id,
      name: suppliers.name,
      supplierReference: suppliers.supplierReference,
      bankAccountName: suppliers.bankAccountName,
      bankAccountBranch: suppliers.bankAccountBranch,
      bankAccountCode: suppliers.bankAccountCode,
      bankAccountNumber: suppliers.bankAccountNumber,
      bankInternationalCode: suppliers.bankInternationalCode,
      paymentDays: suppliers.paymentDays,
      internalComments: suppliers.internalComments,
      phoneNumber: suppliers.phoneNumber,
      faxNumber: suppliers.faxNumber,
      websiteURL: suppliers.websiteURL,
      webServiceUrl: suppliers.webServiceUrl,
      creditRating: suppliers.creditRating,
      activeFlag: suppliers.activeFlag,
      thumbnailUrl: suppliers.thumbnailUrl,
      pickupSameAsHeadOffice: suppliers.pickupSameAsHeadOffice,
      validFrom: suppliers.validFrom ? suppliers.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: suppliers.validTo ? suppliers.validTo.format(DATE_TIME_FORMAT) : null,
      peopleId: suppliers.peopleId,
      supplierCategoryId: suppliers.supplierCategoryId,
      pickupAddressId: suppliers.pickupAddressId,
      headOfficeAddressId: suppliers.headOfficeAddressId,
      deliveryMethods: suppliers.deliveryMethods,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const suppliers = this.createFromForm();
    if (suppliers.id !== undefined) {
      this.subscribeToSaveResponse(this.suppliersService.update(suppliers));
    } else {
      this.subscribeToSaveResponse(this.suppliersService.create(suppliers));
    }
  }

  private createFromForm(): ISuppliers {
    return {
      ...new Suppliers(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      supplierReference: this.editForm.get(['supplierReference'])!.value,
      bankAccountName: this.editForm.get(['bankAccountName'])!.value,
      bankAccountBranch: this.editForm.get(['bankAccountBranch'])!.value,
      bankAccountCode: this.editForm.get(['bankAccountCode'])!.value,
      bankAccountNumber: this.editForm.get(['bankAccountNumber'])!.value,
      bankInternationalCode: this.editForm.get(['bankInternationalCode'])!.value,
      paymentDays: this.editForm.get(['paymentDays'])!.value,
      internalComments: this.editForm.get(['internalComments'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      faxNumber: this.editForm.get(['faxNumber'])!.value,
      websiteURL: this.editForm.get(['websiteURL'])!.value,
      webServiceUrl: this.editForm.get(['webServiceUrl'])!.value,
      creditRating: this.editForm.get(['creditRating'])!.value,
      activeFlag: this.editForm.get(['activeFlag'])!.value,
      thumbnailUrl: this.editForm.get(['thumbnailUrl'])!.value,
      pickupSameAsHeadOffice: this.editForm.get(['pickupSameAsHeadOffice'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
      peopleId: this.editForm.get(['peopleId'])!.value,
      supplierCategoryId: this.editForm.get(['supplierCategoryId'])!.value,
      pickupAddressId: this.editForm.get(['pickupAddressId'])!.value,
      headOfficeAddressId: this.editForm.get(['headOfficeAddressId'])!.value,
      deliveryMethods: this.editForm.get(['deliveryMethods'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISuppliers>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IDeliveryMethods[], option: IDeliveryMethods): IDeliveryMethods {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
