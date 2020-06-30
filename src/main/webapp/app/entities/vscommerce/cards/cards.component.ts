import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICards } from 'app/shared/model/vscommerce/cards.model';
import { CardsService } from './cards.service';
import { CardsDeleteDialogComponent } from './cards-delete-dialog.component';

@Component({
  selector: 'jhi-cards',
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit, OnDestroy {
  cards?: ICards[];
  eventSubscriber?: Subscription;

  constructor(protected cardsService: CardsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cardsService.query().subscribe((res: HttpResponse<ICards[]>) => (this.cards = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCards();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICards): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCards(): void {
    this.eventSubscriber = this.eventManager.subscribe('cardsListModification', () => this.loadAll());
  }

  delete(cards: ICards): void {
    const modalRef = this.modalService.open(CardsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cards = cards;
  }
}
