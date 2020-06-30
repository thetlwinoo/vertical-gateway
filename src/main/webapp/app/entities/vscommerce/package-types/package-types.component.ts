import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPackageTypes } from 'app/shared/model/vscommerce/package-types.model';
import { PackageTypesService } from './package-types.service';
import { PackageTypesDeleteDialogComponent } from './package-types-delete-dialog.component';

@Component({
  selector: 'jhi-package-types',
  templateUrl: './package-types.component.html',
})
export class PackageTypesComponent implements OnInit, OnDestroy {
  packageTypes?: IPackageTypes[];
  eventSubscriber?: Subscription;

  constructor(
    protected packageTypesService: PackageTypesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.packageTypesService.query().subscribe((res: HttpResponse<IPackageTypes[]>) => (this.packageTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPackageTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPackageTypes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPackageTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('packageTypesListModification', () => this.loadAll());
  }

  delete(packageTypes: IPackageTypes): void {
    const modalRef = this.modalService.open(PackageTypesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.packageTypes = packageTypes;
  }
}
