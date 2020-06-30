import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPhotos } from 'app/shared/model/vscommerce/photos.model';

@Component({
  selector: 'jhi-photos-detail',
  templateUrl: './photos-detail.component.html',
})
export class PhotosDetailComponent implements OnInit {
  photos: IPhotos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ photos }) => (this.photos = photos));
  }

  previousState(): void {
    window.history.back();
  }
}
