import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBusinessEntityContact } from 'app/shared/model/vscommerce/business-entity-contact.model';

@Component({
  selector: 'jhi-business-entity-contact-detail',
  templateUrl: './business-entity-contact-detail.component.html',
})
export class BusinessEntityContactDetailComponent implements OnInit {
  businessEntityContact: IBusinessEntityContact | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessEntityContact }) => (this.businessEntityContact = businessEntityContact));
  }

  previousState(): void {
    window.history.back();
  }
}
