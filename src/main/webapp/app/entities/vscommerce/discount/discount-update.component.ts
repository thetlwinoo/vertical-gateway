import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDiscount, Discount } from 'app/shared/model/vscommerce/discount.model';
import { DiscountService } from './discount.service';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { IDiscountTypes } from 'app/shared/model/vscommerce/discount-types.model';
import { DiscountTypesService } from 'app/entities/vscommerce/discount-types/discount-types.service';

type SelectableEntity = ISuppliers | IDiscountTypes;

@Component({
  selector: 'jhi-discount-update',
  templateUrl: './discount-update.component.html',
})
export class DiscountUpdateComponent implements OnInit {
  isSaving = false;
  suppliers: ISuppliers[] = [];
  discounttypes: IDiscountTypes[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
    supplierId: [],
    discountTypeId: [],
  });

  constructor(
    protected discountService: DiscountService,
    protected suppliersService: SuppliersService,
    protected discountTypesService: DiscountTypesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ discount }) => {
      if (!discount.id) {
        const today = moment().startOf('day');
        discount.validFrom = today;
        discount.validTo = today;
      }

      this.updateForm(discount);

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));

      this.discountTypesService.query().subscribe((res: HttpResponse<IDiscountTypes[]>) => (this.discounttypes = res.body || []));
    });
  }

  updateForm(discount: IDiscount): void {
    this.editForm.patchValue({
      id: discount.id,
      name: discount.name,
      description: discount.description,
      validFrom: discount.validFrom ? discount.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: discount.validTo ? discount.validTo.format(DATE_TIME_FORMAT) : null,
      supplierId: discount.supplierId,
      discountTypeId: discount.discountTypeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const discount = this.createFromForm();
    if (discount.id !== undefined) {
      this.subscribeToSaveResponse(this.discountService.update(discount));
    } else {
      this.subscribeToSaveResponse(this.discountService.create(discount));
    }
  }

  private createFromForm(): IDiscount {
    return {
      ...new Discount(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
      supplierId: this.editForm.get(['supplierId'])!.value,
      discountTypeId: this.editForm.get(['discountTypeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiscount>>): void {
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
