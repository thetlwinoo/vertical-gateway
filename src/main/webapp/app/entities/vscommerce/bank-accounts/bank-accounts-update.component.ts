import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IBankAccounts, BankAccounts } from 'app/shared/model/vscommerce/bank-accounts.model';
import { BankAccountsService } from './bank-accounts.service';
import { IPhotos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from 'app/entities/vscommerce/photos/photos.service';

@Component({
  selector: 'jhi-bank-accounts-update',
  templateUrl: './bank-accounts-update.component.html',
})
export class BankAccountsUpdateComponent implements OnInit {
  isSaving = false;
  photos: IPhotos[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    branch: [],
    code: [],
    number: [],
    type: [],
    bank: [],
    internationalCode: [],
    lastEditedBy: [null, [Validators.required]],
    validForm: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
    logoId: [],
  });

  constructor(
    protected bankAccountsService: BankAccountsService,
    protected photosService: PhotosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bankAccounts }) => {
      if (!bankAccounts.id) {
        const today = moment().startOf('day');
        bankAccounts.validForm = today;
        bankAccounts.validTo = today;
      }

      this.updateForm(bankAccounts);

      this.photosService.query().subscribe((res: HttpResponse<IPhotos[]>) => (this.photos = res.body || []));
    });
  }

  updateForm(bankAccounts: IBankAccounts): void {
    this.editForm.patchValue({
      id: bankAccounts.id,
      name: bankAccounts.name,
      branch: bankAccounts.branch,
      code: bankAccounts.code,
      number: bankAccounts.number,
      type: bankAccounts.type,
      bank: bankAccounts.bank,
      internationalCode: bankAccounts.internationalCode,
      lastEditedBy: bankAccounts.lastEditedBy,
      validForm: bankAccounts.validForm ? bankAccounts.validForm.format(DATE_TIME_FORMAT) : null,
      validTo: bankAccounts.validTo ? bankAccounts.validTo.format(DATE_TIME_FORMAT) : null,
      logoId: bankAccounts.logoId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bankAccounts = this.createFromForm();
    if (bankAccounts.id !== undefined) {
      this.subscribeToSaveResponse(this.bankAccountsService.update(bankAccounts));
    } else {
      this.subscribeToSaveResponse(this.bankAccountsService.create(bankAccounts));
    }
  }

  private createFromForm(): IBankAccounts {
    return {
      ...new BankAccounts(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      branch: this.editForm.get(['branch'])!.value,
      code: this.editForm.get(['code'])!.value,
      number: this.editForm.get(['number'])!.value,
      type: this.editForm.get(['type'])!.value,
      bank: this.editForm.get(['bank'])!.value,
      internationalCode: this.editForm.get(['internationalCode'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      validForm: this.editForm.get(['validForm'])!.value ? moment(this.editForm.get(['validForm'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
      logoId: this.editForm.get(['logoId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBankAccounts>>): void {
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
