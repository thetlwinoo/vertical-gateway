import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILogistics } from 'app/shared/model/vscommerce/logistics.model';
import { LogisticsService } from './logistics.service';
import { LogisticsDeleteDialogComponent } from './logistics-delete-dialog.component';

@Component({
  selector: 'jhi-logistics',
  templateUrl: './logistics.component.html',
})
export class LogisticsComponent implements OnInit, OnDestroy {
  logistics?: ILogistics[];
  eventSubscriber?: Subscription;

  constructor(protected logisticsService: LogisticsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.logisticsService.query().subscribe((res: HttpResponse<ILogistics[]>) => (this.logistics = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLogistics();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILogistics): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLogistics(): void {
    this.eventSubscriber = this.eventManager.subscribe('logisticsListModification', () => this.loadAll());
  }

  delete(logistics: ILogistics): void {
    const modalRef = this.modalService.open(LogisticsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.logistics = logistics;
  }
}
