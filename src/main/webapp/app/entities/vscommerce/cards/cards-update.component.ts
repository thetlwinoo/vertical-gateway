import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICards, Cards } from 'app/shared/model/vscommerce/cards.model';
import { CardsService } from './cards.service';

@Component({
  selector: 'jhi-cards-update',
  templateUrl: './cards-update.component.html',
})
export class CardsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    number: [],
    modifiedDate: [],
  });

  constructor(protected cardsService: CardsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cards }) => {
      if (!cards.id) {
        const today = moment().startOf('day');
        cards.modifiedDate = today;
      }

      this.updateForm(cards);
    });
  }

  updateForm(cards: ICards): void {
    this.editForm.patchValue({
      id: cards.id,
      number: cards.number,
      modifiedDate: cards.modifiedDate ? cards.modifiedDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cards = this.createFromForm();
    if (cards.id !== undefined) {
      this.subscribeToSaveResponse(this.cardsService.update(cards));
    } else {
      this.subscribeToSaveResponse(this.cardsService.create(cards));
    }
  }

  private createFromForm(): ICards {
    return {
      ...new Cards(),
      id: this.editForm.get(['id'])!.value,
      number: this.editForm.get(['number'])!.value,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICards>>): void {
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
