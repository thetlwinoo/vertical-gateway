import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompareLines } from 'app/shared/model/vscommerce/compare-lines.model';

@Component({
  selector: 'jhi-compare-lines-detail',
  templateUrl: './compare-lines-detail.component.html',
})
export class CompareLinesDetailComponent implements OnInit {
  compareLines: ICompareLines | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compareLines }) => (this.compareLines = compareLines));
  }

  previousState(): void {
    window.history.back();
  }
}
