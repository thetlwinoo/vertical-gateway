import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAddresses, Addresses } from 'app/shared/model/vscommerce/addresses.model';
import { AddressesService } from './addresses.service';
import { IStateProvinces } from 'app/shared/model/vscommerce/state-provinces.model';
import { StateProvincesService } from 'app/entities/vscommerce/state-provinces/state-provinces.service';
import { IAddressTypes } from 'app/shared/model/vscommerce/address-types.model';
import { AddressTypesService } from 'app/entities/vscommerce/address-types/address-types.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';

type SelectableEntity = IStateProvinces | IAddressTypes | IPeople;

@Component({
  selector: 'jhi-addresses-update',
  templateUrl: './addresses-update.component.html',
})
export class AddressesUpdateComponent implements OnInit {
  isSaving = false;
  stateprovinces: IStateProvinces[] = [];
  addresstypes: IAddressTypes[] = [];
  people: IPeople[] = [];

  editForm = this.fb.group({
    id: [],
    contactPerson: [null, [Validators.required]],
    contactNumber: [null, [Validators.required]],
    contactEmailAddress: [null, [Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    addressLine1: [null, [Validators.required]],
    addressLine2: [],
    city: [],
    postalCode: [],
    defaultInd: [],
    activeInd: [],
    stateProvinceId: [],
    addressTypeId: [],
    personId: [],
  });

  constructor(
    protected addressesService: AddressesService,
    protected stateProvincesService: StateProvincesService,
    protected addressTypesService: AddressTypesService,
    protected peopleService: PeopleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ addresses }) => {
      this.updateForm(addresses);

      this.stateProvincesService.query().subscribe((res: HttpResponse<IStateProvinces[]>) => (this.stateprovinces = res.body || []));

      this.addressTypesService.query().subscribe((res: HttpResponse<IAddressTypes[]>) => (this.addresstypes = res.body || []));

      this.peopleService.query().subscribe((res: HttpResponse<IPeople[]>) => (this.people = res.body || []));
    });
  }

  updateForm(addresses: IAddresses): void {
    this.editForm.patchValue({
      id: addresses.id,
      contactPerson: addresses.contactPerson,
      contactNumber: addresses.contactNumber,
      contactEmailAddress: addresses.contactEmailAddress,
      addressLine1: addresses.addressLine1,
      addressLine2: addresses.addressLine2,
      city: addresses.city,
      postalCode: addresses.postalCode,
      defaultInd: addresses.defaultInd,
      activeInd: addresses.activeInd,
      stateProvinceId: addresses.stateProvinceId,
      addressTypeId: addresses.addressTypeId,
      personId: addresses.personId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const addresses = this.createFromForm();
    if (addresses.id !== undefined) {
      this.subscribeToSaveResponse(this.addressesService.update(addresses));
    } else {
      this.subscribeToSaveResponse(this.addressesService.create(addresses));
    }
  }

  private createFromForm(): IAddresses {
    return {
      ...new Addresses(),
      id: this.editForm.get(['id'])!.value,
      contactPerson: this.editForm.get(['contactPerson'])!.value,
      contactNumber: this.editForm.get(['contactNumber'])!.value,
      contactEmailAddress: this.editForm.get(['contactEmailAddress'])!.value,
      addressLine1: this.editForm.get(['addressLine1'])!.value,
      addressLine2: this.editForm.get(['addressLine2'])!.value,
      city: this.editForm.get(['city'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      defaultInd: this.editForm.get(['defaultInd'])!.value,
      activeInd: this.editForm.get(['activeInd'])!.value,
      stateProvinceId: this.editForm.get(['stateProvinceId'])!.value,
      addressTypeId: this.editForm.get(['addressTypeId'])!.value,
      personId: this.editForm.get(['personId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddresses>>): void {
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
