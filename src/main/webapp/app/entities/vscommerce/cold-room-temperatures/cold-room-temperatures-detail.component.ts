import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IColdRoomTemperatures } from 'app/shared/model/vscommerce/cold-room-temperatures.model';

@Component({
  selector: 'jhi-cold-room-temperatures-detail',
  templateUrl: './cold-room-temperatures-detail.component.html',
})
export class ColdRoomTemperaturesDetailComponent implements OnInit {
  coldRoomTemperatures: IColdRoomTemperatures | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coldRoomTemperatures }) => (this.coldRoomTemperatures = coldRoomTemperatures));
  }

  previousState(): void {
    window.history.back();
  }
}
