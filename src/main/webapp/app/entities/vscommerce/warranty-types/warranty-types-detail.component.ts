import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWarrantyTypes } from 'app/shared/model/vscommerce/warranty-types.model';

@Component({
  selector: 'jhi-warranty-types-detail',
  templateUrl: './warranty-types-detail.component.html',
})
export class WarrantyTypesDetailComponent implements OnInit {
  warrantyTypes: IWarrantyTypes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ warrantyTypes }) => (this.warrantyTypes = warrantyTypes));
  }

  previousState(): void {
    window.history.back();
  }
}
