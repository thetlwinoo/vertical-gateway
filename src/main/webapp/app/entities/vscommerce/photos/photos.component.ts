import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPhotos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from './photos.service';
import { PhotosDeleteDialogComponent } from './photos-delete-dialog.component';

@Component({
  selector: 'jhi-photos',
  templateUrl: './photos.component.html',
})
export class PhotosComponent implements OnInit, OnDestroy {
  photos?: IPhotos[];
  eventSubscriber?: Subscription;

  constructor(protected photosService: PhotosService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.photosService.query().subscribe((res: HttpResponse<IPhotos[]>) => (this.photos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPhotos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPhotos): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPhotos(): void {
    this.eventSubscriber = this.eventManager.subscribe('photosListModification', () => this.loadAll());
  }

  delete(photos: IPhotos): void {
    const modalRef = this.modalService.open(PhotosDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.photos = photos;
  }
}
