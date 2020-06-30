import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPaymentMethods, PaymentMethods } from 'app/shared/model/vscommerce/payment-methods.model';
import { PaymentMethodsService } from './payment-methods.service';
import { IPhotos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from 'app/entities/vscommerce/photos/photos.service';

@Component({
  selector: 'jhi-payment-methods-update',
  templateUrl: './payment-methods-update.component.html',
})
export class PaymentMethodsUpdateComponent implements OnInit {
  isSaving = false;
  photos: IPhotos[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    code: [],
    activeInd: [],
    iconFont: [],
    iconId: [],
  });

  constructor(
    protected paymentMethodsService: PaymentMethodsService,
    protected photosService: PhotosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentMethods }) => {
      this.updateForm(paymentMethods);

      this.photosService.query().subscribe((res: HttpResponse<IPhotos[]>) => (this.photos = res.body || []));
    });
  }

  updateForm(paymentMethods: IPaymentMethods): void {
    this.editForm.patchValue({
      id: paymentMethods.id,
      name: paymentMethods.name,
      code: paymentMethods.code,
      activeInd: paymentMethods.activeInd,
      iconFont: paymentMethods.iconFont,
      iconId: paymentMethods.iconId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paymentMethods = this.createFromForm();
    if (paymentMethods.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentMethodsService.update(paymentMethods));
    } else {
      this.subscribeToSaveResponse(this.paymentMethodsService.create(paymentMethods));
    }
  }

  private createFromForm(): IPaymentMethods {
    return {
      ...new PaymentMethods(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      code: this.editForm.get(['code'])!.value,
      activeInd: this.editForm.get(['activeInd'])!.value,
      iconFont: this.editForm.get(['iconFont'])!.value,
      iconId: this.editForm.get(['iconId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentMethods>>): void {
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
