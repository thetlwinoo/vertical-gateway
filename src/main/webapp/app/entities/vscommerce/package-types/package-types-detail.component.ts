import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPackageTypes } from 'app/shared/model/vscommerce/package-types.model';

@Component({
  selector: 'jhi-package-types-detail',
  templateUrl: './package-types-detail.component.html',
})
export class PackageTypesDetailComponent implements OnInit {
  packageTypes: IPackageTypes | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ packageTypes }) => (this.packageTypes = packageTypes));
  }

  previousState(): void {
    window.history.back();
  }
}
