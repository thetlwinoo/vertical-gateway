import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IShoppingCarts, ShoppingCarts } from 'app/shared/model/vscommerce/shopping-carts.model';
import { ShoppingCartsService } from './shopping-carts.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { ICustomers } from 'app/shared/model/vscommerce/customers.model';
import { CustomersService } from 'app/entities/vscommerce/customers/customers.service';
import { ISpecialDeals } from 'app/shared/model/vscommerce/special-deals.model';
import { SpecialDealsService } from 'app/entities/vscommerce/special-deals/special-deals.service';

type SelectableEntity = IPeople | ICustomers | ISpecialDeals;

@Component({
  selector: 'jhi-shopping-carts-update',
  templateUrl: './shopping-carts-update.component.html',
})
export class ShoppingCartsUpdateComponent implements OnInit {
  isSaving = false;
  cartusers: IPeople[] = [];
  customers: ICustomers[] = [];
  specialdeals: ISpecialDeals[] = [];

  editForm = this.fb.group({
    id: [],
    totalPrice: [],
    subTotalPrice: [],
    totalShippingFee: [],
    totalShippingFeeDiscount: [],
    promotionTotal: [],
    voucherTotal: [],
    packageDetails: [],
    cartString: [],
    dealString: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    cartUserId: [],
    customerId: [],
    specialDealsId: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected shoppingCartsService: ShoppingCartsService,
    protected peopleService: PeopleService,
    protected customersService: CustomersService,
    protected specialDealsService: SpecialDealsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shoppingCarts }) => {
      if (!shoppingCarts.id) {
        const today = moment().startOf('day');
        shoppingCarts.lastEditedWhen = today;
      }

      this.updateForm(shoppingCarts);

      this.peopleService
        .query({ 'cartId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IPeople[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPeople[]) => {
          if (!shoppingCarts.cartUserId) {
            this.cartusers = resBody;
          } else {
            this.peopleService
              .find(shoppingCarts.cartUserId)
              .pipe(
                map((subRes: HttpResponse<IPeople>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPeople[]) => (this.cartusers = concatRes));
          }
        });

      this.customersService.query().subscribe((res: HttpResponse<ICustomers[]>) => (this.customers = res.body || []));

      this.specialDealsService.query().subscribe((res: HttpResponse<ISpecialDeals[]>) => (this.specialdeals = res.body || []));
    });
  }

  updateForm(shoppingCarts: IShoppingCarts): void {
    this.editForm.patchValue({
      id: shoppingCarts.id,
      totalPrice: shoppingCarts.totalPrice,
      subTotalPrice: shoppingCarts.subTotalPrice,
      totalShippingFee: shoppingCarts.totalShippingFee,
      totalShippingFeeDiscount: shoppingCarts.totalShippingFeeDiscount,
      promotionTotal: shoppingCarts.promotionTotal,
      voucherTotal: shoppingCarts.voucherTotal,
      packageDetails: shoppingCarts.packageDetails,
      cartString: shoppingCarts.cartString,
      dealString: shoppingCarts.dealString,
      lastEditedBy: shoppingCarts.lastEditedBy,
      lastEditedWhen: shoppingCarts.lastEditedWhen ? shoppingCarts.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      cartUserId: shoppingCarts.cartUserId,
      customerId: shoppingCarts.customerId,
      specialDealsId: shoppingCarts.specialDealsId,
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
    const shoppingCarts = this.createFromForm();
    if (shoppingCarts.id !== undefined) {
      this.subscribeToSaveResponse(this.shoppingCartsService.update(shoppingCarts));
    } else {
      this.subscribeToSaveResponse(this.shoppingCartsService.create(shoppingCarts));
    }
  }

  private createFromForm(): IShoppingCarts {
    return {
      ...new ShoppingCarts(),
      id: this.editForm.get(['id'])!.value,
      totalPrice: this.editForm.get(['totalPrice'])!.value,
      subTotalPrice: this.editForm.get(['subTotalPrice'])!.value,
      totalShippingFee: this.editForm.get(['totalShippingFee'])!.value,
      totalShippingFeeDiscount: this.editForm.get(['totalShippingFeeDiscount'])!.value,
      promotionTotal: this.editForm.get(['promotionTotal'])!.value,
      voucherTotal: this.editForm.get(['voucherTotal'])!.value,
      packageDetails: this.editForm.get(['packageDetails'])!.value,
      cartString: this.editForm.get(['cartString'])!.value,
      dealString: this.editForm.get(['dealString'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      cartUserId: this.editForm.get(['cartUserId'])!.value,
      customerId: this.editForm.get(['customerId'])!.value,
      specialDealsId: this.editForm.get(['specialDealsId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShoppingCarts>>): void {
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
