import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISpecialDeals, SpecialDeals } from 'app/shared/model/vscommerce/special-deals.model';
import { SpecialDealsService } from './special-deals.service';
import { IBuyingGroups } from 'app/shared/model/vscommerce/buying-groups.model';
import { BuyingGroupsService } from 'app/entities/vscommerce/buying-groups/buying-groups.service';
import { ICustomerCategories } from 'app/shared/model/vscommerce/customer-categories.model';
import { CustomerCategoriesService } from 'app/entities/vscommerce/customer-categories/customer-categories.service';
import { ICustomers } from 'app/shared/model/vscommerce/customers.model';
import { CustomersService } from 'app/entities/vscommerce/customers/customers.service';
import { IProductCategory } from 'app/shared/model/vscommerce/product-category.model';
import { ProductCategoryService } from 'app/entities/vscommerce/product-category/product-category.service';
import { IStockItems } from 'app/shared/model/vscommerce/stock-items.model';
import { StockItemsService } from 'app/entities/vscommerce/stock-items/stock-items.service';

type SelectableEntity = IBuyingGroups | ICustomerCategories | ICustomers | IProductCategory | IStockItems;

@Component({
  selector: 'jhi-special-deals-update',
  templateUrl: './special-deals-update.component.html',
})
export class SpecialDealsUpdateComponent implements OnInit {
  isSaving = false;
  buyinggroups: IBuyingGroups[] = [];
  customercategories: ICustomerCategories[] = [];
  customers: ICustomers[] = [];
  productcategories: IProductCategory[] = [];
  stockitems: IStockItems[] = [];

  editForm = this.fb.group({
    id: [],
    dealDescription: [null, [Validators.required]],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    discountAmount: [],
    discountPercentage: [],
    discountCode: [],
    unitPrice: [],
    lastEditedBy: [null, [Validators.required]],
    lastEditedWhen: [null, [Validators.required]],
    buyingGroupId: [],
    customerCategoryId: [],
    customerId: [],
    productCategoryId: [],
    stockItemId: [],
  });

  constructor(
    protected specialDealsService: SpecialDealsService,
    protected buyingGroupsService: BuyingGroupsService,
    protected customerCategoriesService: CustomerCategoriesService,
    protected customersService: CustomersService,
    protected productCategoryService: ProductCategoryService,
    protected stockItemsService: StockItemsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ specialDeals }) => {
      if (!specialDeals.id) {
        const today = moment().startOf('day');
        specialDeals.startDate = today;
        specialDeals.endDate = today;
        specialDeals.lastEditedWhen = today;
      }

      this.updateForm(specialDeals);

      this.buyingGroupsService.query().subscribe((res: HttpResponse<IBuyingGroups[]>) => (this.buyinggroups = res.body || []));

      this.customerCategoriesService
        .query()
        .subscribe((res: HttpResponse<ICustomerCategories[]>) => (this.customercategories = res.body || []));

      this.customersService.query().subscribe((res: HttpResponse<ICustomers[]>) => (this.customers = res.body || []));

      this.productCategoryService.query().subscribe((res: HttpResponse<IProductCategory[]>) => (this.productcategories = res.body || []));

      this.stockItemsService.query().subscribe((res: HttpResponse<IStockItems[]>) => (this.stockitems = res.body || []));
    });
  }

  updateForm(specialDeals: ISpecialDeals): void {
    this.editForm.patchValue({
      id: specialDeals.id,
      dealDescription: specialDeals.dealDescription,
      startDate: specialDeals.startDate ? specialDeals.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: specialDeals.endDate ? specialDeals.endDate.format(DATE_TIME_FORMAT) : null,
      discountAmount: specialDeals.discountAmount,
      discountPercentage: specialDeals.discountPercentage,
      discountCode: specialDeals.discountCode,
      unitPrice: specialDeals.unitPrice,
      lastEditedBy: specialDeals.lastEditedBy,
      lastEditedWhen: specialDeals.lastEditedWhen ? specialDeals.lastEditedWhen.format(DATE_TIME_FORMAT) : null,
      buyingGroupId: specialDeals.buyingGroupId,
      customerCategoryId: specialDeals.customerCategoryId,
      customerId: specialDeals.customerId,
      productCategoryId: specialDeals.productCategoryId,
      stockItemId: specialDeals.stockItemId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const specialDeals = this.createFromForm();
    if (specialDeals.id !== undefined) {
      this.subscribeToSaveResponse(this.specialDealsService.update(specialDeals));
    } else {
      this.subscribeToSaveResponse(this.specialDealsService.create(specialDeals));
    }
  }

  private createFromForm(): ISpecialDeals {
    return {
      ...new SpecialDeals(),
      id: this.editForm.get(['id'])!.value,
      dealDescription: this.editForm.get(['dealDescription'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      discountAmount: this.editForm.get(['discountAmount'])!.value,
      discountPercentage: this.editForm.get(['discountPercentage'])!.value,
      discountCode: this.editForm.get(['discountCode'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      lastEditedWhen: this.editForm.get(['lastEditedWhen'])!.value
        ? moment(this.editForm.get(['lastEditedWhen'])!.value, DATE_TIME_FORMAT)
        : undefined,
      buyingGroupId: this.editForm.get(['buyingGroupId'])!.value,
      customerCategoryId: this.editForm.get(['customerCategoryId'])!.value,
      customerId: this.editForm.get(['customerId'])!.value,
      productCategoryId: this.editForm.get(['productCategoryId'])!.value,
      stockItemId: this.editForm.get(['stockItemId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpecialDeals>>): void {
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
