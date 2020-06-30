import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMaterials } from 'app/shared/model/vscommerce/materials.model';
import { MaterialsService } from './materials.service';
import { MaterialsDeleteDialogComponent } from './materials-delete-dialog.component';

@Component({
  selector: 'jhi-materials',
  templateUrl: './materials.component.html',
})
export class MaterialsComponent implements OnInit, OnDestroy {
  materials?: IMaterials[];
  eventSubscriber?: Subscription;

  constructor(protected materialsService: MaterialsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.materialsService.query().subscribe((res: HttpResponse<IMaterials[]>) => (this.materials = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMaterials();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMaterials): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMaterials(): void {
    this.eventSubscriber = this.eventManager.subscribe('materialsListModification', () => this.loadAll());
  }

  delete(materials: IMaterials): void {
    const modalRef = this.modalService.open(MaterialsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.materials = materials;
  }
}
