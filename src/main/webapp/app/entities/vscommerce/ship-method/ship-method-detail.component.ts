import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShipMethod } from 'app/shared/model/vscommerce/ship-method.model';

@Component({
  selector: 'jhi-ship-method-detail',
  templateUrl: './ship-method-detail.component.html',
})
export class ShipMethodDetailComponent implements OnInit {
  shipMethod: IShipMethod | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shipMethod }) => (this.shipMethod = shipMethod));
  }

  previousState(): void {
    window.history.back();
  }
}
