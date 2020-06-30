import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShipMethod } from 'app/shared/model/vscommerce/ship-method.model';
import { ShipMethodService } from './ship-method.service';
import { ShipMethodDeleteDialogComponent } from './ship-method-delete-dialog.component';

@Component({
  selector: 'jhi-ship-method',
  templateUrl: './ship-method.component.html',
})
export class ShipMethodComponent implements OnInit, OnDestroy {
  shipMethods?: IShipMethod[];
  eventSubscriber?: Subscription;

  constructor(protected shipMethodService: ShipMethodService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.shipMethodService.query().subscribe((res: HttpResponse<IShipMethod[]>) => (this.shipMethods = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInShipMethods();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IShipMethod): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInShipMethods(): void {
    this.eventSubscriber = this.eventManager.subscribe('shipMethodListModification', () => this.loadAll());
  }

  delete(shipMethod: IShipMethod): void {
    const modalRef = this.modalService.open(ShipMethodDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shipMethod = shipMethod;
  }
}
