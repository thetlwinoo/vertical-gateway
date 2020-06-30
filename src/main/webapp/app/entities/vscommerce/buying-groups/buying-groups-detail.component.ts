import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBuyingGroups } from 'app/shared/model/vscommerce/buying-groups.model';

@Component({
  selector: 'jhi-buying-groups-detail',
  templateUrl: './buying-groups-detail.component.html',
})
export class BuyingGroupsDetailComponent implements OnInit {
  buyingGroups: IBuyingGroups | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ buyingGroups }) => (this.buyingGroups = buyingGroups));
  }

  previousState(): void {
    window.history.back();
  }
}
