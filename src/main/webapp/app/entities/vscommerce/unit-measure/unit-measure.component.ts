import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUnitMeasure } from 'app/shared/model/vscommerce/unit-measure.model';
import { UnitMeasureService } from './unit-measure.service';
import { UnitMeasureDeleteDialogComponent } from './unit-measure-delete-dialog.component';

@Component({
  selector: 'jhi-unit-measure',
  templateUrl: './unit-measure.component.html',
})
export class UnitMeasureComponent implements OnInit, OnDestroy {
  unitMeasures?: IUnitMeasure[];
  eventSubscriber?: Subscription;

  constructor(
    protected unitMeasureService: UnitMeasureService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.unitMeasureService.query().subscribe((res: HttpResponse<IUnitMeasure[]>) => (this.unitMeasures = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUnitMeasures();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUnitMeasure): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUnitMeasures(): void {
    this.eventSubscriber = this.eventManager.subscribe('unitMeasureListModification', () => this.loadAll());
  }

  delete(unitMeasure: IUnitMeasure): void {
    const modalRef = this.modalService.open(UnitMeasureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.unitMeasure = unitMeasure;
  }
}
