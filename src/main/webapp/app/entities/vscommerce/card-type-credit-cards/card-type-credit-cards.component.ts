import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICardTypeCreditCards } from 'app/shared/model/vscommerce/card-type-credit-cards.model';
import { CardTypeCreditCardsService } from './card-type-credit-cards.service';
import { CardTypeCreditCardsDeleteDialogComponent } from './card-type-credit-cards-delete-dialog.component';

@Component({
  selector: 'jhi-card-type-credit-cards',
  templateUrl: './card-type-credit-cards.component.html',
})
export class CardTypeCreditCardsComponent implements OnInit, OnDestroy {
  cardTypeCreditCards?: ICardTypeCreditCards[];
  eventSubscriber?: Subscription;

  constructor(
    protected cardTypeCreditCardsService: CardTypeCreditCardsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.cardTypeCreditCardsService
      .query()
      .subscribe((res: HttpResponse<ICardTypeCreditCards[]>) => (this.cardTypeCreditCards = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCardTypeCreditCards();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICardTypeCreditCards): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCardTypeCreditCards(): void {
    this.eventSubscriber = this.eventManager.subscribe('cardTypeCreditCardsListModification', () => this.loadAll());
  }

  delete(cardTypeCreditCards: ICardTypeCreditCards): void {
    const modalRef = this.modalService.open(CardTypeCreditCardsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cardTypeCreditCards = cardTypeCreditCards;
  }
}
