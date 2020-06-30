import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerCategories } from 'app/shared/model/vscommerce/customer-categories.model';

@Component({
  selector: 'jhi-customer-categories-detail',
  templateUrl: './customer-categories-detail.component.html',
})
export class CustomerCategoriesDetailComponent implements OnInit {
  customerCategories: ICustomerCategories | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customerCategories }) => (this.customerCategories = customerCategories));
  }

  previousState(): void {
    window.history.back();
  }
}
