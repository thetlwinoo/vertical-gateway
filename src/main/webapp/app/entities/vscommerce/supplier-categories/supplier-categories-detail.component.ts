import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupplierCategories } from 'app/shared/model/vscommerce/supplier-categories.model';

@Component({
  selector: 'jhi-supplier-categories-detail',
  templateUrl: './supplier-categories-detail.component.html',
})
export class SupplierCategoriesDetailComponent implements OnInit {
  supplierCategories: ISupplierCategories | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supplierCategories }) => (this.supplierCategories = supplierCategories));
  }

  previousState(): void {
    window.history.back();
  }
}
