import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPhotos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from './photos.service';

@Component({
  templateUrl: './photos-delete-dialog.component.html',
})
export class PhotosDeleteDialogComponent {
  photos?: IPhotos;

  constructor(protected photosService: PhotosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.photosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('photosListModification');
      this.activeModal.close();
    });
  }
}
