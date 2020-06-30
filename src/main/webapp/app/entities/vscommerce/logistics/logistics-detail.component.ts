import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILogistics } from 'app/shared/model/vscommerce/logistics.model';

@Component({
  selector: 'jhi-logistics-detail',
  templateUrl: './logistics-detail.component.html',
})
export class LogisticsDetailComponent implements OnInit {
  logistics: ILogistics | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ logistics }) => (this.logistics = logistics));
  }

  previousState(): void {
    window.history.back();
  }
}
