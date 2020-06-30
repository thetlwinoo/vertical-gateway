import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IQuestions, Questions } from 'app/shared/model/vscommerce/questions.model';
import { QuestionsService } from './questions.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ISuppliers } from 'app/shared/model/vscommerce/suppliers.model';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { IProducts } from 'app/shared/model/vscommerce/products.model';
import { ProductsService } from 'app/entities/vscommerce/products/products.service';

type SelectableEntity = ISuppliers | IPeople | IProducts;

@Component({
  selector: 'jhi-questions-update',
  templateUrl: './questions-update.component.html',
})
export class QuestionsUpdateComponent implements OnInit {
  isSaving = false;
  suppliers: ISuppliers[] = [];
  people: IPeople[] = [];
  products: IProducts[] = [];

  editForm = this.fb.group({
    id: [],
    customerQuestion: [null, [Validators.required]],
    customerQuestionOn: [null, [Validators.required]],
    supplierAnswer: [],
    supplierAnswerOn: [],
    activeInd: [],
    supplierId: [],
    personId: [],
    productId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected questionsService: QuestionsService,
    protected suppliersService: SuppliersService,
    protected peopleService: PeopleService,
    protected productsService: ProductsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ questions }) => {
      if (!questions.id) {
        const today = moment().startOf('day');
        questions.customerQuestionOn = today;
        questions.supplierAnswerOn = today;
      }

      this.updateForm(questions);

      this.suppliersService.query().subscribe((res: HttpResponse<ISuppliers[]>) => (this.suppliers = res.body || []));

      this.peopleService.query().subscribe((res: HttpResponse<IPeople[]>) => (this.people = res.body || []));

      this.productsService.query().subscribe((res: HttpResponse<IProducts[]>) => (this.products = res.body || []));
    });
  }

  updateForm(questions: IQuestions): void {
    this.editForm.patchValue({
      id: questions.id,
      customerQuestion: questions.customerQuestion,
      customerQuestionOn: questions.customerQuestionOn ? questions.customerQuestionOn.format(DATE_TIME_FORMAT) : null,
      supplierAnswer: questions.supplierAnswer,
      supplierAnswerOn: questions.supplierAnswerOn ? questions.supplierAnswerOn.format(DATE_TIME_FORMAT) : null,
      activeInd: questions.activeInd,
      supplierId: questions.supplierId,
      personId: questions.personId,
      productId: questions.productId,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const questions = this.createFromForm();
    if (questions.id !== undefined) {
      this.subscribeToSaveResponse(this.questionsService.update(questions));
    } else {
      this.subscribeToSaveResponse(this.questionsService.create(questions));
    }
  }

  private createFromForm(): IQuestions {
    return {
      ...new Questions(),
      id: this.editForm.get(['id'])!.value,
      customerQuestion: this.editForm.get(['customerQuestion'])!.value,
      customerQuestionOn: this.editForm.get(['customerQuestionOn'])!.value
        ? moment(this.editForm.get(['customerQuestionOn'])!.value, DATE_TIME_FORMAT)
        : undefined,
      supplierAnswer: this.editForm.get(['supplierAnswer'])!.value,
      supplierAnswerOn: this.editForm.get(['supplierAnswerOn'])!.value
        ? moment(this.editForm.get(['supplierAnswerOn'])!.value, DATE_TIME_FORMAT)
        : undefined,
      activeInd: this.editForm.get(['activeInd'])!.value,
      supplierId: this.editForm.get(['supplierId'])!.value,
      personId: this.editForm.get(['personId'])!.value,
      productId: this.editForm.get(['productId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuestions>>): void {
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
