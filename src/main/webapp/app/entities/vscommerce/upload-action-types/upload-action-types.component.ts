import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUploadActionTypes } from 'app/shared/model/vscommerce/upload-action-types.model';
import { UploadActionTypesService } from './upload-action-types.service';
import { UploadActionTypesDeleteDialogComponent } from './upload-action-types-delete-dialog.component';

@Component({
  selector: 'jhi-upload-action-types',
  templateUrl: './upload-action-types.component.html',
})
export class UploadActionTypesComponent implements OnInit, OnDestroy {
  uploadActionTypes?: IUploadActionTypes[];
  eventSubscriber?: Subscription;

  constructor(
    protected uploadActionTypesService: UploadActionTypesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.uploadActionTypesService.query().subscribe((res: HttpResponse<IUploadActionTypes[]>) => (this.uploadActionTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUploadActionTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUploadActionTypes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUploadActionTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('uploadActionTypesListModification', () => this.loadAll());
  }

  delete(uploadActionTypes: IUploadActionTypes): void {
    const modalRef = this.modalService.open(UploadActionTypesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.uploadActionTypes = uploadActionTypes;
  }
}
