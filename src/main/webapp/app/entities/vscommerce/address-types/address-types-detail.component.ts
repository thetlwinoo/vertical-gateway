import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAddressTypes } from 'app/shared/model/vscommerce/address-types.model';

@Component({
  selector: 'jhi-address-types-detail',
  templateUrl: './address-types-detail.component.html',
})
export class AddressTypesDetailComponent implements OnInit {
  addressTypes: IAddressTypes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ addressTypes }) => (this.addressTypes = addressTypes));
  }

  previousState(): void {
    window.history.back();
  }
}
