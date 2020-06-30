import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICardTypes, CardTypes } from 'app/shared/model/vscommerce/card-types.model';
import { CardTypesService } from './card-types.service';

@Component({
  selector: 'jhi-card-types-update',
  templateUrl: './card-types-update.component.html',
})
export class CardTypesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    issuerId: [],
    modifiedDate: [],
  });

  constructor(protected cardTypesService: CardTypesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardTypes }) => {
      if (!cardTypes.id) {
        const today = moment().startOf('day');
        cardTypes.modifiedDate = today;
      }

      this.updateForm(cardTypes);
    });
  }

  updateForm(cardTypes: ICardTypes): void {
    this.editForm.patchValue({
      id: cardTypes.id,
      name: cardTypes.name,
      issuerId: cardTypes.issuerId,
      modifiedDate: cardTypes.modifiedDate ? cardTypes.modifiedDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardTypes = this.createFromForm();
    if (cardTypes.id !== undefined) {
      this.subscribeToSaveResponse(this.cardTypesService.update(cardTypes));
    } else {
      this.subscribeToSaveResponse(this.cardTypesService.create(cardTypes));
    }
  }

  private createFromForm(): ICardTypes {
    return {
      ...new CardTypes(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      issuerId: this.editForm.get(['issuerId'])!.value,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardTypes>>): void {
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
