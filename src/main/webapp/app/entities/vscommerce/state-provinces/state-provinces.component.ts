import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStateProvinces } from 'app/shared/model/vscommerce/state-provinces.model';
import { StateProvincesService } from './state-provinces.service';
import { StateProvincesDeleteDialogComponent } from './state-provinces-delete-dialog.component';

@Component({
  selector: 'jhi-state-provinces',
  templateUrl: './state-provinces.component.html',
})
export class StateProvincesComponent implements OnInit, OnDestroy {
  stateProvinces?: IStateProvinces[];
  eventSubscriber?: Subscription;

  constructor(
    protected stateProvincesService: StateProvincesService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.stateProvincesService.query().subscribe((res: HttpResponse<IStateProvinces[]>) => (this.stateProvinces = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStateProvinces();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStateProvinces): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStateProvinces(): void {
    this.eventSubscriber = this.eventManager.subscribe('stateProvincesListModification', () => this.loadAll());
  }

  delete(stateProvinces: IStateProvinces): void {
    const modalRef = this.modalService.open(StateProvincesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.stateProvinces = stateProvinces;
  }
}
