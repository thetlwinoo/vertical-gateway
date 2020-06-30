import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICountries } from 'app/shared/model/vscommerce/countries.model';
import { CountriesService } from './countries.service';
import { CountriesDeleteDialogComponent } from './countries-delete-dialog.component';

@Component({
  selector: 'jhi-countries',
  templateUrl: './countries.component.html',
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries?: ICountries[];
  eventSubscriber?: Subscription;

  constructor(protected countriesService: CountriesService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.countriesService.query().subscribe((res: HttpResponse<ICountries[]>) => (this.countries = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCountries();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICountries): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCountries(): void {
    this.eventSubscriber = this.eventManager.subscribe('countriesListModification', () => this.loadAll());
  }

  delete(countries: ICountries): void {
    const modalRef = this.modalService.open(CountriesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.countries = countries;
  }
}
