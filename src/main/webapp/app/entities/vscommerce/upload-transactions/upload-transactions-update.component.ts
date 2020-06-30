import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IUploadTransactions, UploadTransactions } from 'app/shared/model/vscommerce/upload-transactions.model';
import { UploadTransactionsService } from './upload-transactions.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { IUploadActionTypes } from 'app/shared/model/vscommerce/upload-action-types.model';
import { UploadActionTypesService } from 'app/entities/vscommerce/upload-action-types/upload-action-types.service';

type SelectableEntity = ISuppliers | IUploadActionTypes;

@Component({
  selector: 'jhi-upload-transactions-update',
  templateUrl: './upload-transactions-update.component.html',
})
export class UploadTransactionsUpdateComponent implements OnInit {
  isSaving = false;
  suppliers: ISuppliers[] = [];
  uploadactiontypes: IUploadActionTypes[] = [];

  editForm = this.fb.group({
    id: [],
    fileName: [],
    importedTemplate: [],
    importedTemplateContentType: [],
    importedFailedTemplate: [],
    importedFailedTemplateContentType: [],
    status: [],
    generatedCode: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    supplierId: [],
    actionTypeId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected uploadTransactionsService: UploadTransactionsService,
    protected suppliersService: SuppliersService,
    protected uploadActionTypesService: UploadActionTypesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uploadTransactions }) => {
      if (!uploadTransactions.id) {
        const today = moment().startOf('day');
        uploadTransactions.lastEditedWhen = today;
      }

      this.updateForm(uploadTransactions);

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));

      this.uploadActionTypesService
        .query()
        .subscribe((res: HttpResponse<IUploadActionTypes[]>) => (this.uploadactiontypes = res.body || []));
    });
  }

  updateForm(uploadTransactions: IUploadTransactions): void {
    this.editForm.patchValue({
      id: uploadTransactions.id,
      fileName: uploadTransactions.fileName,
      importedTemplate: uploadTransactions.importedTemplate,
      importedTemplateContentType: uploadTransactions.importedTemplateContentType,
      importedFailedTemplate: uploadTransactions.importedFailedTemplate,
      importedFailedTemplateContentType: uploadTransactions.importedFailedTemplateContentType,
      status: uploadTransactions.status,
      generatedCode: uploadTransactions.generatedCode,
      lastEditedBy: uploadTransactions.lastEditedBy,
      lastEditedWhen: uploadTransactions.lastEditedWhen ? uploadTransactions.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      supplierId: uploadTransactions.supplierId,
      actionTypeId: uploadTransactions.actionTypeId,
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
    const uploadTransactions = this.createFromForm();
    if (uploadTransactions.id !== undefined) {
      this.subscribeToSaveResponse(this.uploadTransactionsService.update(uploadTransactions));
    } else {
      this.subscribeToSaveResponse(this.uploadTransactionsService.create(uploadTransactions));
    }
  }

  private createFromForm(): IUploadTransactions {
    return {
      ...new UploadTransactions(),
      id: this.editForm.get(['id'])!.value,
      fileName: this.editForm.get(['fileName'])!.value,
      importedTemplateContentType: this.editForm.get(['importedTemplateContentType'])!.value,
      importedTemplate: this.editForm.get(['importedTemplate'])!.value,
      importedFailedTemplateContentType: this.editForm.get(['importedFailedTemplateContentType'])!.value,
      importedFailedTemplate: this.editForm.get(['importedFailedTemplate'])!.value,
      status: this.editForm.get(['status'])!.value,
      generatedCode: this.editForm.get(['generatedCode'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      supplierId: this.editForm.get(['supplierId'])!.value,
      actionTypeId: this.editForm.get(['actionTypeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUploadTransactions>>): void {
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
