import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUploadActionTypes } from 'app/shared/model/vscommerce/upload-action-types.model';

@Component({
  selector: 'jhi-upload-action-types-detail',
  templateUrl: './upload-action-types-detail.component.html',
})
export class UploadActionTypesDetailComponent implements OnInit {
  uploadActionTypes: IUploadActionTypes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ uploadActionTypes }) => (this.uploadActionTypes = uploadActionTypes));
  }

  previousState(): void {
    window.history.back();
  }
}
