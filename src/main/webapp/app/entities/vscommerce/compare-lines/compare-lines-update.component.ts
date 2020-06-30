import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICompareLines, CompareLines } from 'app/shared/model/vscommerce/compare-lines.model';
import { CompareLinesService } from './compare-lines.service';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from 'app/entities/vscommerce/stock-items/stock-items.service';
import { ICompares } from 'app/shared/model/vscommerce/compares.model';
import { ComparesService } from 'app/entities/vscommerce/compares/compares.service';

type SelectableEntity = IStockItems | ICompares;

@Component({
  selector: 'jhi-compare-lines-update',
  templateUrl: './compare-lines-update.component.html',
})
export class CompareLinesUpdateComponent implements OnInit {
  isSaving = false;
  stockitems: IStockItems[] = [];
  compares: ICompares[] = [];

  editForm = this.fb.group({
    id: [],
    stockItemId: [],
    compareId: [],
  });

  constructor(
    protected compareLinesService: CompareLinesService,
    protected stockItemsService: StockItemsService,
    protected comparesService: ComparesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ compareLines }) => {
      this.updateForm(compareLines);

      this.stockItemsService.query().subscribe((res: HttpResponse<IStockItems[]>) => (this.stockitems = res.body || []));

      this.comparesService.query().subscribe((res: HttpResponse<ICompares[]>) => (this.compares = res.body || []));
    });
  }

  updateForm(compareLines: ICompareLines): void {
    this.editForm.patchValue({
      id: compareLines.id,
      stockItemId: compareLines.stockItemId,
      compareId: compareLines.compareId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const compareLines = this.createFromForm();
    if (compareLines.id !== undefined) {
      this.subscribeToSaveResponse(this.compareLinesService.update(compareLines));
    } else {
      this.subscribeToSaveResponse(this.compareLinesService.create(compareLines));
    }
  }

  private createFromForm(): ICompareLines {
    return {
      ...new CompareLines(),
      id: this.editForm.get(['id'])!.value,
      stockItemId: this.editForm.get(['stockItemId'])!.value,
      compareId: this.editForm.get(['compareId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompareLines>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
