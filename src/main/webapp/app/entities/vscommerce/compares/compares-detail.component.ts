import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompares } from 'app/shared/model/vscommerce/compares.model';

@Component({
  selector: 'jhi-compares-detail',
  templateUrl: './compares-detail.component.html',
})
export class ComparesDetailComponent implements OnInit {
  compares: ICompares | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compares }) => (this.compares = compares));
  }

  previousState(): void {
    window.history.back();
  }
}
