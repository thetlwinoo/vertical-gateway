import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPackageTypes, PackageTypes } from 'app/shared/model/vscommerce/package-types.model';
import { PackageTypesService } from './package-types.service';

@Component({
  selector: 'jhi-package-types-update',
  templateUrl: './package-types-update.component.html',
})
export class PackageTypesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
  });

  constructor(protected packageTypesService: PackageTypesService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ packageTypes }) => {
      if (!packageTypes.id) {
        const today = moment().startOf('day');
        packageTypes.validFrom = today;
        packageTypes.validTo = today;
      }

      this.updateForm(packageTypes);
    });
  }

  updateForm(packageTypes: IPackageTypes): void {
    this.editForm.patchValue({
      id: packageTypes.id,
      name: packageTypes.name,
      validFrom: packageTypes.validFrom ? packageTypes.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: packageTypes.validTo ? packageTypes.validTo.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const packageTypes = this.createFromForm();
    if (packageTypes.id !== undefined) {
      this.subscribeToSaveResponse(this.packageTypesService.update(packageTypes));
    } else {
      this.subscribeToSaveResponse(this.packageTypesService.create(packageTypes));
    }
  }

  private createFromForm(): IPackageTypes {
    return {
      ...new PackageTypes(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPackageTypes>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
