import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPeople, People } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from './people.service';
import { IPhotos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from 'app/entities/vscommerce/photos/photos.service';

@Component({
  selector: 'jhi-people-update',
  templateUrl: './people-update.component.html',
})
export class PeopleUpdateComponent implements OnInit {
  isSaving = false;
  photos: IPhotos[] = [];

  editForm = this.fb.group({
    id: [],
    fullName: [null, [Validators.required]],
    preferredName: [null, [Validators.required]],
    searchName: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    dateOfBirth: [],
    isPermittedToLogon: [null, [Validators.required]],
    logonName: [],
    isExternalLogonProvider: [null, [Validators.required]],
    isSystemUser: [null, [Validators.required]],
    isEmployee: [null, [Validators.required]],
    isSalesPerson: [null, [Validators.required]],
    isGuestUser: [null, [Validators.required]],
    emailPromotion: [null, [Validators.required]],
    userPreferences: [],
    phoneNumber: [],
    emailAddress: [null, [Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    customFields: [],
    otherLanguages: [],
    userId: [null, [Validators.required]],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
    profileId: [],
  });

  constructor(
    protected peopleService: PeopleService,
    protected photosService: PhotosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ people }) => {
      if (!people.id) {
        const today = moment().startOf('day');
        people.dateOfBirth = today;
        people.validFrom = today;
        people.validTo = today;
      }

      this.updateForm(people);

      this.photosService.query().subscribe((res: HttpResponse<IPhotos[]>) => (this.photos = res.body || []));
    });
  }

  updateForm(people: IPeople): void {
    this.editForm.patchValue({
      id: people.id,
      fullName: people.fullName,
      preferredName: people.preferredName,
      searchName: people.searchName,
      gender: people.gender,
      dateOfBirth: people.dateOfBirth ? people.dateOfBirth.format(DATE_TIME_FORMAT) : null,
      isPermittedToLogon: people.isPermittedToLogon,
      logonName: people.logonName,
      isExternalLogonProvider: people.isExternalLogonProvider,
      isSystemUser: people.isSystemUser,
      isEmployee: people.isEmployee,
      isSalesPerson: people.isSalesPerson,
      isGuestUser: people.isGuestUser,
      emailPromotion: people.emailPromotion,
      userPreferences: people.userPreferences,
      phoneNumber: people.phoneNumber,
      emailAddress: people.emailAddress,
      customFields: people.customFields,
      otherLanguages: people.otherLanguages,
      userId: people.userId,
      validFrom: people.validFrom ? people.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: people.validTo ? people.validTo.format(DATE_TIME_FORMAT) : null,
      profileId: people.profileId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const people = this.createFromForm();
    if (people.id !== undefined) {
      this.subscribeToSaveResponse(this.peopleService.update(people));
    } else {
      this.subscribeToSaveResponse(this.peopleService.create(people));
    }
  }

  private createFromForm(): IPeople {
    return {
      ...new People(),
      id: this.editForm.get(['id'])!.value,
      fullName: this.editForm.get(['fullName'])!.value,
      preferredName: this.editForm.get(['preferredName'])!.value,
      searchName: this.editForm.get(['searchName'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      dateOfBirth: this.editForm.get(['dateOfBirth'])!.value
        ? moment(this.editForm.get(['dateOfBirth'])!.value, DATE_TIME_FORMAT)
        : undefined,
      isPermittedToLogon: this.editForm.get(['isPermittedToLogon'])!.value,
      logonName: this.editForm.get(['logonName'])!.value,
      isExternalLogonProvider: this.editForm.get(['isExternalLogonProvider'])!.value,
      isSystemUser: this.editForm.get(['isSystemUser'])!.value,
      isEmployee: this.editForm.get(['isEmployee'])!.value,
      isSalesPerson: this.editForm.get(['isSalesPerson'])!.value,
      isGuestUser: this.editForm.get(['isGuestUser'])!.value,
      emailPromotion: this.editForm.get(['emailPromotion'])!.value,
      userPreferences: this.editForm.get(['userPreferences'])!.value,
      phoneNumber: this.editForm.get(['phoneNumber'])!.value,
      emailAddress: this.editForm.get(['emailAddress'])!.value,
      customFields: this.editForm.get(['customFields'])!.value,
      otherLanguages: this.editForm.get(['otherLanguages'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
      profileId: this.editForm.get(['profileId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeople>>): void {
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

  trackById(index: number, item: IPhotos): any {
    return item.id;
  }
}
