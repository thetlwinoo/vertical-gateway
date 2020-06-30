import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITax, Tax } from 'app/shared/model/vscommerce/tax.model';
import { TaxService } from './tax.service';
import { ITaxClass } from 'app/shared/model/vscommerce/tax-class.model';
import { TaxClassService } from 'app/entities/vscommerce/tax-class/tax-class.service';

@Component({
  selector: 'jhi-tax-update',
  templateUrl: './tax-update.component.html',
})
export class TaxUpdateComponent implements OnInit {
  isSaving = false;
  taxclasses: ITaxClass[] = [];

  editForm = this.fb.group({
    id: [],
    code: [],
    name: [null, [Validators.required]],
    rate: [null, [Validators.required]],
    modifiedDate: [null, [Validators.required]],
    taxClassId: [],
  });

  constructor(
    protected taxService: TaxService,
    protected taxClassService: TaxClassService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tax }) => {
      if (!tax.id) {
        const today = moment().startOf('day');
        tax.modifiedDate = today;
      }

      this.updateForm(tax);

      this.taxClassService.query().subscribe((res: HttpResponse<ITaxClass[]>) => (this.taxclasses = res.body || []));
    });
  }

  updateForm(tax: ITax): void {
    this.editForm.patchValue({
      id: tax.id,
      code: tax.code,
      name: tax.name,
      rate: tax.rate,
      modifiedDate: tax.modifiedDate ? tax.modifiedDate.format(DATE_TIME_FORMAT) : null,
      taxClassId: tax.taxClassId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tax = this.createFromForm();
    if (tax.id !== undefined) {
      this.subscribeToSaveResponse(this.taxService.update(tax));
    } else {
      this.subscribeToSaveResponse(this.taxService.create(tax));
    }
  }

  private createFromForm(): ITax {
    return {
      ...new Tax(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      name: this.editForm.get(['name'])!.value,
      rate: this.editForm.get(['rate'])!.value,
      modifiedDate: this.editForm.get(['modifiedDate'])!.value
        ? moment(this.editForm.get(['modifiedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      taxClassId: this.editForm.get(['taxClassId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITax>>): void {
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

  trackById(index: number, item: ITaxClass): any {
    return item.id;
  }
}
