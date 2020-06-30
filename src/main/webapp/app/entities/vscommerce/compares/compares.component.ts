import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompares } from 'app/shared/model/vscommerce/compares.model';
import { ComparesService } from './compares.service';
import { ComparesDeleteDialogComponent } from './compares-delete-dialog.component';

@Component({
  selector: 'jhi-compares',
  templateUrl: './compares.component.html',
})
export class ComparesComponent implements OnInit, OnDestroy {
  compares?: ICompares[];
  eventSubscriber?: Subscription;

  constructor(protected comparesService: ComparesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.comparesService.query().subscribe((res: HttpResponse<ICompares[]>) => (this.compares = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCompares();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICompares): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCompares(): void {
    this.eventSubscriber = this.eventManager.subscribe('comparesListModification', () => this.loadAll());
  }

  delete(compares: ICompares): void {
    const modalRef = this.modalService.open(ComparesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.compares = compares;
  }
}
