import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICulture } from 'app/shared/model/vscommerce/culture.model';

@Component({
  selector: 'jhi-culture-detail',
  templateUrl: './culture-detail.component.html',
})
export class CultureDetailComponent implements OnInit {
  culture: ICulture | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ culture }) => (this.culture = culture));
  }

  previousState(): void {
    window.history.back();
  }
}
