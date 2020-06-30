import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBusinessEntityAddress } from 'app/shared/model/vscommerce/business-entity-address.model';

@Component({
  selector: 'jhi-business-entity-address-detail',
  templateUrl: './business-entity-address-detail.component.html',
})
export class BusinessEntityAddressDetailComponent implements OnInit {
  businessEntityAddress: IBusinessEntityAddress | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessEntityAddress }) => (this.businessEntityAddress = businessEntityAddress));
  }

  previousState(): void {
    window.history.back();
  }
}
