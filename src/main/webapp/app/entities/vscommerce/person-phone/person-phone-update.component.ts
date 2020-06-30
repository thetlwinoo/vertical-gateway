import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPersonPhone, PersonPhone } from 'app/shared/model/vscommerce/person-phone.model';
import { PersonPhoneService } from './person-phone.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { IPhoneNumberType } from 'app/shared/model/vscommerce/phone-number-type.model';
import { PhoneNumberTypeService } from 'app/entities/vscommerce/phone-number-type/phone-number-type.service';

type SelectableEntity = IPeople | IPhoneNumberType;

@Component({
  selector: 'jhi-person-phone-update',
  templateUrl: './person-phone-update.component.html',
})
export class PersonPhoneUpdateComponent implements OnInit {
  isSaving = false;
  people: IPeople[] = [];
  phonenumbertypes: IPhoneNumberType[] = [];

  editForm = this.fb.group({
    id: [],
    phoneNumber: [null, [Validators.required]],
    defaultInd: [],
    activeInd: [],
    personId: [],
    phoneNumberTypeId: [],
  });

  constructor(
    protected personPhoneService: PersonPhoneService,
    protected peopleService: PeopleService,
    protected phoneNumberTypeService: PhoneNumberTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personPhone }) => {
      this.updateForm(personPhone);

      this.peopleService.query().subscribe((res: HttpResponse<IPeople[]>) => (this.people = res.body || []));

      this.phoneNumberTypeService.query().subscribe((res: HttpResponse<IPhoneNumberType[]>) => (this.phonenumbertypes = res.body || []));
    });
  }

  updateForm(personPhone: IPersonPhone): void {
    this.editForm.patchValue({
      id: personPhone.id,
      phoneNumber: personPhone.phoneNumber,
      defaultInd: personPhone.defaultInd,
      activeInd: personPhone.activeInd,
      personId: personPhone.personId,
      phoneNumberTypeId: personPhone.phoneNumberTypeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const personPhone = this.createFromForm();
    if (personPhone.id !== undefined) {
      this.subscribeToSaveResponse(this.personPhoneService.update(personPhone));
    } else {
      this.subscribeToSaveResponse(this.personPhoneService.create(personPhone));
    }
  }

  private createFromForm(): IPersonPhone {
    return {
      ...new PersonPhone(),
      id: this.editForm.get(['id'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      defaultInd: this.editForm.get(['defaultInd'])!.value,
      activeInd: this.editForm.get(['activeInd'])!.value,
      personId: this.editForm.get(['personId'])!.value,
      phoneNumberTypeId: this.editForm.get(['phoneNumberTypeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonPhone>>): void {
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
