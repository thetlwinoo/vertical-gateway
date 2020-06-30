import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICompares, Compares } from 'app/shared/model/vscommerce/compares.model';
import { ComparesService } from './compares.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';

@Component({
  selector: 'jhi-compares-update',
  templateUrl: './compares-update.component.html',
})
export class ComparesUpdateComponent implements OnInit {
  isSaving = false;
  compareusers: IPeople[] = [];

  editForm = this.fb.group({
    id: [],
    compareUserId: [],
  });

  constructor(
    protected comparesService: ComparesService,
    protected peopleService: PeopleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compares }) => {
      this.updateForm(compares);

      this.peopleService
        .query({ 'compareId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IPeople[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPeople[]) => {
          if (!compares.compareUserId) {
            this.compareusers = resBody;
          } else {
            this.peopleService
              .find(compares.compareUserId)
              .pipe(
                map((subRes: HttpResponse<IPeople>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPeople[]) => (this.compareusers = concatRes));
          }
        });
    });
  }

  updateForm(compares: ICompares): void {
    this.editForm.patchValue({
      id: compares.id,
      compareUserId: compares.compareUserId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const compares = this.createFromForm();
    if (compares.id !== undefined) {
      this.subscribeToSaveResponse(this.comparesService.update(compares));
    } else {
      this.subscribeToSaveResponse(this.comparesService.create(compares));
    }
  }

  private createFromForm(): ICompares {
    return {
      ...new Compares(),
      id: this.editForm.get(['id'])!.value,
      compareUserId: this.editForm.get(['compareUserId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompares>>): void {
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

  trackById(index: number, item: IPeople): any {
    return item.id;
  }
}
