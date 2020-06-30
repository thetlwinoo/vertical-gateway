import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBusinessEntityAddress, BusinessEntityAddress } from 'app/shared/model/vscommerce/business-entity-address.model';
import { BusinessEntityAddressService } from './business-entity-address.service';
import { IAddresses } from 'app/shared/model/vscommerce/addresses.model';
import { AddressesService } from 'app/entities/vscommerce/addresses/addresses.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { IAddressTypes } from 'app/shared/model/vscommerce/address-types.model';
import { AddressTypesService } from 'app/entities/vscommerce/address-types/address-types.service';

type SelectableEntity = IAddresses | IPeople | IAddressTypes;

@Component({
  selector: 'jhi-business-entity-address-update',
  templateUrl: './business-entity-address-update.component.html',
})
export class BusinessEntityAddressUpdateComponent implements OnInit {
  isSaving = false;
  addresses: IAddresses[] = [];
  people: IPeople[] = [];
  addresstypes: IAddressTypes[] = [];

  editForm = this.fb.group({
    id: [],
    addressId: [],
    personId: [],
    addressTypeId: [],
  });

  constructor(
    protected businessEntityAddressService: BusinessEntityAddressService,
    protected addressesService: AddressesService,
    protected peopleService: PeopleService,
    protected addressTypesService: AddressTypesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessEntityAddress }) => {
      this.updateForm(businessEntityAddress);

      this.addressesService.query().subscribe((res: HttpResponse<IAddresses[]>) => (this.addresses = res.body || []));

      this.peopleService.query().subscribe((res: HttpResponse<IPeople[]>) => (this.people = res.body || []));

      this.addressTypesService.query().subscribe((res: HttpResponse<IAddressTypes[]>) => (this.addresstypes = res.body || []));
    });
  }

  updateForm(businessEntityAddress: IBusinessEntityAddress): void {
    this.editForm.patchValue({
      id: businessEntityAddress.id,
      addressId: businessEntityAddress.addressId,
      personId: businessEntityAddress.personId,
      addressTypeId: businessEntityAddress.addressTypeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const businessEntityAddress = this.createFromForm();
    if (businessEntityAddress.id !== undefined) {
      this.subscribeToSaveResponse(this.businessEntityAddressService.update(businessEntityAddress));
    } else {
      this.subscribeToSaveResponse(this.businessEntityAddressService.create(businessEntityAddress));
    }
  }

  private createFromForm(): IBusinessEntityAddress {
    return {
      ...new BusinessEntityAddress(),
      id: this.editForm.get(['id'])!.value,
      addressId: this.editForm.get(['addressId'])!.value,
      personId: this.editForm.get(['personId'])!.value,
      addressTypeId: this.editForm.get(['addressTypeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessEntityAddress>>): void {
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
}
