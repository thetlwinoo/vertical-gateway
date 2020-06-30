import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISupplierTransactionStatus, SupplierTransactionStatus } from 'app/shared/model/vscommerce/supplier-transaction-status.model';
import { SupplierTransactionStatusService } from './supplier-transaction-status.service';

@Component({
  selector: 'jhi-supplier-transaction-status-update',
  templateUrl: './supplier-transaction-status-update.component.html',
})
export class SupplierTransactionStatusUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    label: [],
    shortLabel: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
  });

  constructor(
    protected supplierTransactionStatusService: SupplierTransactionStatusService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplierTransactionStatus }) => {
      if (!supplierTransactionStatus.id) {
        const today = moment().startOf('day');
        supplierTransactionStatus.lastEditedWhen = today;
      }

      this.updateForm(supplierTransactionStatus);
    });
  }

  updateForm(supplierTransactionStatus: ISupplierTransactionStatus): void {
    this.editForm.patchValue({
      id: supplierTransactionStatus.id,
      name: supplierTransactionStatus.name,
      label: supplierTransactionStatus.label,
      shortLabel: supplierTransactionStatus.shortLabel,
      lastEditedBy: supplierTransactionStatus.lastEditedBy,
      lastEditedWhen: supplierTransactionStatus.lastEditedWhen ? supplierTransactionStatus.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supplierTransactionStatus = this.createFromForm();
    if (supplierTransactionStatus.id !== undefined) {
      this.subscribeToSaveResponse(this.supplierTransactionStatusService.update(supplierTransactionStatus));
    } else {
      this.subscribeToSaveResponse(this.supplierTransactionStatusService.create(supplierTransactionStatus));
    }
  }

  private createFromForm(): ISupplierTransactionStatus {
    return {
      ...new SupplierTransactionStatus(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      label: this.editForm.get(['label'])!.value,
      shortLabel: this.editForm.get(['shortLabel'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplierTransactionStatus>>): void {
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
