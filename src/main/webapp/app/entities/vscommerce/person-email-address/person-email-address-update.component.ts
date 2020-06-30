import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPersonEmailAddress, PersonEmailAddress } from 'app/shared/model/vscommerce/person-email-address.model';
import { PersonEmailAddressService } from './person-email-address.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';

@Component({
  selector: 'jhi-person-email-address-update',
  templateUrl: './person-email-address-update.component.html',
})
export class PersonEmailAddressUpdateComponent implements OnInit {
  isSaving = false;
  people: IPeople[] = [];

  editForm = this.fb.group({
    id: [],
    emailAddress: [null, [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    defaultInd: [],
    activeInd: [],
    personId: [],
  });

  constructor(
    protected personEmailAddressService: PersonEmailAddressService,
    protected peopleService: PeopleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personEmailAddress }) => {
      this.updateForm(personEmailAddress);

      this.peopleService.query().subscribe((res: HttpResponse<IPeople[]>) => (this.people = res.body || []));
    });
  }

  updateForm(personEmailAddress: IPersonEmailAddress): void {
    this.editForm.patchValue({
      id: personEmailAddress.id,
      emailAddress: personEmailAddress.emailAddress,
      defaultInd: personEmailAddress.defaultInd,
      activeInd: personEmailAddress.activeInd,
      personId: personEmailAddress.personId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const personEmailAddress = this.createFromForm();
    if (personEmailAddress.id !== undefined) {
      this.subscribeToSaveResponse(this.personEmailAddressService.update(personEmailAddress));
    } else {
      this.subscribeToSaveResponse(this.personEmailAddressService.create(personEmailAddress));
    }
  }

  private createFromForm(): IPersonEmailAddress {
    return {
      ...new PersonEmailAddress(),
      id: this.editForm.get(['id'])!.value,
      emailAddress: this.editForm.get(['emailAddress'])!.value,
      defaultInd: this.editForm.get(['defaultInd'])!.value,
      activeInd: this.editForm.get(['activeInd'])!.value,
      personId: this.editForm.get(['personId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonEmailAddress>>): void {
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

  trackById(index: number, item: IPeople): any {
    return item.id;
  }
}
