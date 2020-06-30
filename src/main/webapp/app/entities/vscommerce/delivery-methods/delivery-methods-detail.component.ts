import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';

@Component({
  selector: 'jhi-delivery-methods-detail',
  templateUrl: './delivery-methods-detail.component.html',
})
export class DeliveryMethodsDetailComponent implements OnInit {
  deliveryMethods: IDeliveryMethods | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ deliveryMethods }) => (this.deliveryMethods = deliveryMethods));
  }

  previousState(): void {
    window.history.back();
  }
}
