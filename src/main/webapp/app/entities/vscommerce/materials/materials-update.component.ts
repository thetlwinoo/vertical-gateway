import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMaterials, Materials } from 'app/shared/model/vscommerce/materials.model';
import { MaterialsService } from './materials.service';

@Component({
  selector: 'jhi-materials-update',
  templateUrl: './materials-update.component.html',
})
export class MaterialsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
  });

  constructor(protected materialsService: MaterialsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ materials }) => {
      this.updateForm(materials);
    });
  }

  updateForm(materials: IMaterials): void {
    this.editForm.patchValue({
      id: materials.id,
      name: materials.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const materials = this.createFromForm();
    if (materials.id !== undefined) {
      this.subscribeToSaveResponse(this.materialsService.update(materials));
    } else {
      this.subscribeToSaveResponse(this.materialsService.create(materials));
    }
  }

  private createFromForm(): IMaterials {
    return {
      ...new Materials(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaterials>>): void {
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
