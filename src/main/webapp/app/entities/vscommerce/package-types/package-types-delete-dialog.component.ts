import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPackageTypes } from 'app/shared/model/vscommerce/package-types.model';
import { PackageTypesService } from './package-types.service';

@Component({
  templateUrl: './package-types-delete-dialog.component.html',
})
export class PackageTypesDeleteDialogComponent {
  packageTypes?: IPackageTypes;

  constructor(
    protected packageTypesService: PackageTypesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.packageTypesService.delete(id).subscribe(() => {
      this.eventManager.broadcast('packageTypesListModification');
      this.activeModal.close();
    });
  }
}
