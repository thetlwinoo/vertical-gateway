import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IProductDocument, ProductDocument } from 'app/shared/model/vscommerce/product-document.model';
import { ProductDocumentService } from './product-document.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IWarrantyTypes } from 'app/shared/model/vscommerce/warranty-types.model';
import { WarrantyTypesService } from 'app/entities/vscommerce/warranty-types/warranty-types.service';
import { ICulture } from 'app/shared/model/vscommerce/culture.model';
import { CultureService } from 'app/entities/vscommerce/culture/culture.service';

type SelectableEntity = IWarrantyTypes | ICulture;

@Component({
  selector: 'jhi-product-document-update',
  templateUrl: './product-document-update.component.html',
})
export class ProductDocumentUpdateComponent implements OnInit {
  isSaving = false;
  warrantytypes: IWarrantyTypes[] = [];
  cultures: ICulture[] = [];

  editForm = this.fb.group({
    id: [],
    videoUrl: [],
    highlights: [],
    longDescription: [],
    shortDescription: [],
    whatInTheBox: [],
    careInstructions: [],
    productType: [],
    modelName: [],
    modelNumber: [],
    fabricType: [],
    specialFeatures: [],
    productComplianceCertificate: [],
    genuineAndLegal: [],
    countryOfOrigin: [],
    usageAndSideEffects: [],
    safetyWarnning: [],
    warrantyPeriod: [],
    warrantyPolicy: [],
    dangerousGoods: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    warrantyTypeId: [],
    cultureId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected productDocumentService: ProductDocumentService,
    protected warrantyTypesService: WarrantyTypesService,
    protected cultureService: CultureService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productDocument }) => {
      if (!productDocument.id) {
        const today = moment().startOf('day');
        productDocument.lastEditedWhen = today;
      }

      this.updateForm(productDocument);

      this.warrantyTypesService.query().subscribe((res: HttpResponse<IWarrantyTypes[]>) => (this.warrantytypes = res.body || []));

      this.cultureService.query().subscribe((res: HttpResponse<ICulture[]>) => (this.cultures = res.body || []));
    });
  }

  updateForm(productDocument: IProductDocument): void {
    this.editForm.patchValue({
      id: productDocument.id,
      videoUrl: productDocument.videoUrl,
      highlights: productDocument.highlights,
      longDescription: productDocument.longDescription,
      shortDescription: productDocument.shortDescription,
      whatInTheBox: productDocument.whatInTheBox,
      careInstructions: productDocument.careInstructions,
      productType: productDocument.productType,
      modelName: productDocument.modelName,
      modelNumber: productDocument.modelNumber,
      fabricType: productDocument.fabricType,
      specialFeatures: productDocument.specialFeatures,
      productComplianceCertificate: productDocument.productComplianceCertificate,
      genuineAndLegal: productDocument.genuineAndLegal,
      countryOfOrigin: productDocument.countryOfOrigin,
      usageAndSideEffects: productDocument.usageAndSideEffects,
      safetyWarnning: productDocument.safetyWarnning,
      warrantyPeriod: productDocument.warrantyPeriod,
      warrantyPolicy: productDocument.warrantyPolicy,
      dangerousGoods: productDocument.dangerousGoods,
      lastEditedBy: productDocument.lastEditedBy,
      lastEditedWhen: productDocument.lastEditedWhen ? productDocument.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      warrantyTypeId: productDocument.warrantyTypeId,
      cultureId: productDocument.cultureId,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productDocument = this.createFromForm();
    if (productDocument.id !== undefined) {
      this.subscribeToSaveResponse(this.productDocumentService.update(productDocument));
    } else {
      this.subscribeToSaveResponse(this.productDocumentService.create(productDocument));
    }
  }

  private createFromForm(): IProductDocument {
    return {
      ...new ProductDocument(),
      id: this.editForm.get(['id'])!.value,
      videoUrl: this.editForm.get(['videoUrl'])!.value,
      highlights: this.editForm.get(['highlights'])!.value,
      longDescription: this.editForm.get(['longDescription'])!.value,
      shortDescription: this.editForm.get(['shortDescription'])!.value,
      whatInTheBox: this.editForm.get(['whatInTheBox'])!.value,
      careInstructions: this.editForm.get(['careInstructions'])!.value,
      productType: this.editForm.get(['productType'])!.value,
      modelName: this.editForm.get(['modelName'])!.value,
      modelNumber: this.editForm.get(['modelNumber'])!.value,
      fabricType: this.editForm.get(['fabricType'])!.value,
      specialFeatures: this.editForm.get(['specialFeatures'])!.value,
      productComplianceCertificate: this.editForm.get(['productComplianceCertificate'])!.value,
      genuineAndLegal: this.editForm.get(['genuineAndLegal'])!.value,
      countryOfOrigin: this.editForm.get(['countryOfOrigin'])!.value,
      usageAndSideEffects: this.editForm.get(['usageAndSideEffects'])!.value,
      safetyWarnning: this.editForm.get(['safetyWarnning'])!.value,
      warrantyPeriod: this.editForm.get(['warrantyPeriod'])!.value,
      warrantyPolicy: this.editForm.get(['warrantyPolicy'])!.value,
      dangerousGoods: this.editForm.get(['dangerousGoods'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      warrantyTypeId: this.editForm.get(['warrantyTypeId'])!.value,
      cultureId: this.editForm.get(['cultureId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductDocument>>): void {
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
