import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonEmailAddress } from 'app/shared/model/vscommerce/person-email-address.model';

@Component({
  selector: 'jhi-person-email-address-detail',
  templateUrl: './person-email-address-detail.component.html',
})
export class PersonEmailAddressDetailComponent implements OnInit {
  personEmailAddress: IPersonEmailAddress | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personEmailAddress }) => (this.personEmailAddress = personEmailAddress));
  }

  previousState(): void {
    window.history.back();
  }
}
