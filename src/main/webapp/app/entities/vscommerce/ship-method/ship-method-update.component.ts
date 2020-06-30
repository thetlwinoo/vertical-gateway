import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IShipMethod, ShipMethod } from 'app/shared/model/vscommerce/ship-method.model';
import { ShipMethodService } from './ship-method.service';

@Component({
  selector: 'jhi-ship-method-update',
  templateUrl: './ship-method-update.component.html',
})
export class ShipMethodUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
  });

  constructor(protected shipMethodService: ShipMethodService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shipMethod }) => {
      this.updateForm(shipMethod);
    });
  }

  updateForm(shipMethod: IShipMethod): void {
    this.editForm.patchValue({
      id: shipMethod.id,
      name: shipMethod.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shipMethod = this.createFromForm();
    if (shipMethod.id !== undefined) {
      this.subscribeToSaveResponse(this.shipMethodService.update(shipMethod));
    } else {
      this.subscribeToSaveResponse(this.shipMethodService.create(shipMethod));
    }
  }

  private createFromForm(): IShipMethod {
    return {
      ...new ShipMethod(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShipMethod>>): void {
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
