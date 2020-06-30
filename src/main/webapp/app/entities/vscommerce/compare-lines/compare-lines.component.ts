import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompareLines } from 'app/shared/model/vscommerce/compare-lines.model';
import { CompareLinesService } from './compare-lines.service';
import { CompareLinesDeleteDialogComponent } from './compare-lines-delete-dialog.component';

@Component({
  selector: 'jhi-compare-lines',
  templateUrl: './compare-lines.component.html',
})
export class CompareLinesComponent implements OnInit, OnDestroy {
  compareLines?: ICompareLines[];
  eventSubscriber?: Subscription;

  constructor(
    protected compareLinesService: CompareLinesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.compareLinesService.query().subscribe((res: HttpResponse<ICompareLines[]>) => (this.compareLines = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCompareLines();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICompareLines): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCompareLines(): void {
    this.eventSubscriber = this.eventManager.subscribe('compareLinesListModification', () => this.loadAll());
  }

  delete(compareLines: ICompareLines): void {
    const modalRef = this.modalService.open(CompareLinesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.compareLines = compareLines;
  }
}
