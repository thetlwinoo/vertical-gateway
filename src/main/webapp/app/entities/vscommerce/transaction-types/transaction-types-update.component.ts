import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITransactionTypes, TransactionTypes } from 'app/shared/model/vscommerce/transaction-types.model';
import { TransactionTypesService } from './transaction-types.service';

@Component({
  selector: 'jhi-transaction-types-update',
  templateUrl: './transaction-types-update.component.html',
})
export class TransactionTypesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
  });

  constructor(
    protected transactionTypesService: TransactionTypesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ transactionTypes }) => {
      if (!transactionTypes.id) {
        const today = moment().startOf('day');
        transactionTypes.validFrom = today;
        transactionTypes.validTo = today;
      }

      this.updateForm(transactionTypes);
    });
  }

  updateForm(transactionTypes: ITransactionTypes): void {
    this.editForm.patchValue({
      id: transactionTypes.id,
      name: transactionTypes.name,
      validFrom: transactionTypes.validFrom ? transactionTypes.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: transactionTypes.validTo ? transactionTypes.validTo.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const transactionTypes = this.createFromForm();
    if (transactionTypes.id !== undefined) {
      this.subscribeToSaveResponse(this.transactionTypesService.update(transactionTypes));
    } else {
      this.subscribeToSaveResponse(this.transactionTypesService.create(transactionTypes));
    }
  }

  private createFromForm(): ITransactionTypes {
    return {
      ...new TransactionTypes(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionTypes>>): void {
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
