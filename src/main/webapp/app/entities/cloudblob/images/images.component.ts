import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IImages } from 'app/shared/model/cloudblob/images.model';
import { ImagesService } from './images.service';
import { ImagesDeleteDialogComponent } from './images-delete-dialog.component';

@Component({
  selector: 'jhi-images',
  templateUrl: './images.component.html',
})
export class ImagesComponent implements OnInit, OnDestroy {
  images?: IImages[];
  eventSubscriber?: Subscription;

  constructor(
    protected imagesService: ImagesService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.imagesService.query().subscribe((res: HttpResponse<IImages[]>) => (this.images = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInImages();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IImages): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInImages(): void {
    this.eventSubscriber = this.eventManager.subscribe('imagesListModification', () => this.loadAll());
  }

  delete(images: IImages): void {
    const modalRef = this.modalService.open(ImagesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.images = images;
  }
}
