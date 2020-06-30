import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICardTypeCreditCards, CardTypeCreditCards } from 'app/shared/model/vscommerce/card-type-credit-cards.model';
import { CardTypeCreditCardsService } from './card-type-credit-cards.service';

@Component({
  selector: 'jhi-card-type-credit-cards-update',
  templateUrl: './card-type-credit-cards-update.component.html',
})
export class CardTypeCreditCardsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    startNumber: [],
    endNumber: [],
    modifiedDate: [],
  });

  constructor(
    protected cardTypeCreditCardsService: CardTypeCreditCardsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardTypeCreditCards }) => {
      if (!cardTypeCreditCards.id) {
        const today = moment().startOf('day');
        cardTypeCreditCards.modifiedDate = today;
      }

      this.updateForm(cardTypeCreditCards);
    });
  }

  updateForm(cardTypeCreditCards: ICardTypeCreditCards): void {
    this.editForm.patchValue({
      id: cardTypeCreditCards.id,
      name: cardTypeCreditCards.name,
      startNumber: cardTypeCreditCards.startNumber,
      endNumber: cardTypeCreditCards.endNumber,
      modifiedDate: cardTypeCreditCards.modifiedDate ? cardTypeCreditCards.modifiedDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardTypeCreditCards = this.createFromForm();
    if (cardTypeCreditCards.id !== undefined) {
      this.subscribeToSaveResponse(this.cardTypeCreditCardsService.update(cardTypeCreditCards));
    } else {
      this.subscribeToSaveResponse(this.cardTypeCreditCardsService.create(cardTypeCreditCards));
    }
  }

  private createFromForm(): ICardTypeCreditCards {
    return {
      ...new CardTypeCreditCards(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      startNumber: this.editForm.get(['startNumber'])!.value,
      endNumber: this.editForm.get(['endNumber'])!.value,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardTypeCreditCards>>): void {
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
