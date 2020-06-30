import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICardTypes } from 'app/shared/model/vscommerce/card-types.model';
import { CardTypesService } from './card-types.service';
import { CardTypesDeleteDialogComponent } from './card-types-delete-dialog.component';

@Component({
  selector: 'jhi-card-types',
  templateUrl: './card-types.component.html',
})
export class CardTypesComponent implements OnInit, OnDestroy {
  cardTypes?: ICardTypes[];
  eventSubscriber?: Subscription;

  constructor(protected cardTypesService: CardTypesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cardTypesService.query().subscribe((res: HttpResponse<ICardTypes[]>) => (this.cardTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCardTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICardTypes): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCardTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('cardTypesListModification', () => this.loadAll());
  }

  delete(cardTypes: ICardTypes): void {
    const modalRef = this.modalService.open(CardTypesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cardTypes = cardTypes;
  }
}
