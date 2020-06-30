import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICulture } from 'app/shared/model/vscommerce/culture.model';
import { CultureService } from './culture.service';
import { CultureDeleteDialogComponent } from './culture-delete-dialog.component';

@Component({
  selector: 'jhi-culture',
  templateUrl: './culture.component.html',
})
export class CultureComponent implements OnInit, OnDestroy {
  cultures?: ICulture[];
  eventSubscriber?: Subscription;

  constructor(protected cultureService: CultureService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cultureService.query().subscribe((res: HttpResponse<ICulture[]>) => (this.cultures = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCultures();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICulture): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCultures(): void {
    this.eventSubscriber = this.eventManager.subscribe('cultureListModification', () => this.loadAll());
  }

  delete(culture: ICulture): void {
    const modalRef = this.modalService.open(CultureDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.culture = culture;
  }
}
