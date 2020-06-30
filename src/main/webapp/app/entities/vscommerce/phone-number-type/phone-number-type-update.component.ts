import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPhoneNumberType, PhoneNumberType } from 'app/shared/model/vscommerce/phone-number-type.model';
import { PhoneNumberTypeService } from './phone-number-type.service';

@Component({
  selector: 'jhi-phone-number-type-update',
  templateUrl: './phone-number-type-update.component.html',
})
export class PhoneNumberTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(
    protected phoneNumberTypeService: PhoneNumberTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ phoneNumberType }) => {
      this.updateForm(phoneNumberType);
    });
  }

  updateForm(phoneNumberType: IPhoneNumberType): void {
    this.editForm.patchValue({
      id: phoneNumberType.id,
      name: phoneNumberType.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const phoneNumberType = this.createFromForm();
    if (phoneNumberType.id !== undefined) {
      this.subscribeToSaveResponse(this.phoneNumberTypeService.update(phoneNumberType));
    } else {
      this.subscribeToSaveResponse(this.phoneNumberTypeService.create(phoneNumberType));
    }
  }

  private createFromForm(): IPhoneNumberType {
    return {
      ...new PhoneNumberType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPhoneNumberType>>): void {
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
}
