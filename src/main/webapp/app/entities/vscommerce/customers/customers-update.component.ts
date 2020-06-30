import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICustomers, Customers } from 'app/shared/model/vscommerce/customers.model';
import { CustomersService } from './customers.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { IDeliveryMethods } from 'app/shared/model/vscommerce/delivery-methods.model';
import { DeliveryMethodsService } from 'app/entities/vscommerce/delivery-methods/delivery-methods.service';
import { IAddresses } from 'app/shared/model/vscommerce/addresses.model';
import { AddressesService } from 'app/entities/vscommerce/addresses/addresses.service';

type SelectableEntity = IPeople | IDeliveryMethods | IAddresses;

@Component({
  selector: 'jhi-customers-update',
  templateUrl: './customers-update.component.html',
})
export class CustomersUpdateComponent implements OnInit {
  isSaving = false;
  people: IPeople[] = [];
  deliverymethods: IDeliveryMethods[] = [];
  addresses: IAddresses[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    accountNumber: [null, [Validators.required]],
    accountOpenedDate: [null, [Validators.required]],
    standardDiscountPercentage: [null, [Validators.required]],
    isStatementSent: [null, [Validators.required]],
    isOnCreditHold: [null, [Validators.required]],
    paymentDays: [null, [Validators.required]],
    deliveryRun: [],
    runPosition: [],
    thumbnailUrl: [],
    billToAddressSameAsDeliveryAddress: [],
    lastEditedBy: [null, [Validators.required]],
    validFrom: [null, [Validators.required]],
    validTo: [null, [Validators.required]],
    peopleId: [],
    deliveryMethodId: [],
    deliveryAddressId: [],
    billToAddressId: [],
  });

  constructor(
    protected customersService: CustomersService,
    protected peopleService: PeopleService,
    protected deliveryMethodsService: DeliveryMethodsService,
    protected addressesService: AddressesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ customers }) => {
      if (!customers.id) {
        const today = moment().startOf('day');
        customers.accountOpenedDate = today;
        customers.validFrom = today;
        customers.validTo = today;
      }

      this.updateForm(customers);

      this.peopleService
        .query({ 'customersId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IPeople[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPeople[]) => {
          if (!customers.peopleId) {
            this.people = resBody;
          } else {
            this.peopleService
              .find(customers.peopleId)
              .pipe(
                map((subRes: HttpResponse<IPeople>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPeople[]) => (this.people = concatRes));
          }
        });

      this.deliveryMethodsService.query().subscribe((res: HttpResponse<IDeliveryMethods[]>) => (this.deliverymethods = res.body || []));

      this.addressesService.query().subscribe((res: HttpResponse<IAddresses[]>) => (this.addresses = res.body || []));
    });
  }

  updateForm(customers: ICustomers): void {
    this.editForm.patchValue({
      id: customers.id,
      name: customers.name,
      accountNumber: customers.accountNumber,
      accountOpenedDate: customers.accountOpenedDate ? customers.accountOpenedDate.format(DATE_TIME_FORMAT) : null,
      standardDiscountPercentage: customers.standardDiscountPercentage,
      isStatementSent: customers.isStatementSent,
      isOnCreditHold: customers.isOnCreditHold,
      paymentDays: customers.paymentDays,
      deliveryRun: customers.deliveryRun,
      runPosition: customers.runPosition,
      thumbnailUrl: customers.thumbnailUrl,
      billToAddressSameAsDeliveryAddress: customers.billToAddressSameAsDeliveryAddress,
      lastEditedBy: customers.lastEditedBy,
      validFrom: customers.validFrom ? customers.validFrom.format(DATE_TIME_FORMAT) : null,
      validTo: customers.validTo ? customers.validTo.format(DATE_TIME_FORMAT) : null,
      peopleId: customers.peopleId,
      deliveryMethodId: customers.deliveryMethodId,
      deliveryAddressId: customers.deliveryAddressId,
      billToAddressId: customers.billToAddressId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const customers = this.createFromForm();
    if (customers.id !== undefined) {
      this.subscribeToSaveResponse(this.customersService.update(customers));
    } else {
      this.subscribeToSaveResponse(this.customersService.create(customers));
    }
  }

  private createFromForm(): ICustomers {
    return {
      ...new Customers(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      accountNumber: this.editForm.get(['accountNumber'])!.value,
      accountOpenedDate: this.editForm.get(['accountOpenedDate'])!.value
        ? moment(this.editForm.get(['accountOpenedDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      standardDiscountPercentage: this.editForm.get(['standardDiscountPercentage'])!.value,
      isStatementSent: this.editForm.get(['isStatementSent'])!.value,
      isOnCreditHold: this.editForm.get(['isOnCreditHold'])!.value,
      paymentDays: this.editForm.get(['paymentDays'])!.value,
      deliveryRun: this.editForm.get(['deliveryRun'])!.value,
      runPosition: this.editForm.get(['runPosition'])!.value,
      thumbnailUrl: this.editForm.get(['thumbnailUrl'])!.value,
      billToAddressSameAsDeliveryAddress: this.editForm.get(['billToAddressSameAsDeliveryAddress'])!.value,
      lastEditedBy: this.editForm.get(['lastEditedBy'])!.value,
      validFrom: this.editForm.get(['validFrom'])!.value ? moment(this.editForm.get(['validFrom'])!.value, DATE_TIME_FORMAT) : undefined,
      validTo: this.editForm.get(['validTo'])!.value ? moment(this.editForm.get(['validTo'])!.value, DATE_TIME_FORMAT) : undefined,
      peopleId: this.editForm.get(['peopleId'])!.value,
      deliveryMethodId: this.editForm.get(['deliveryMethodId'])!.value,
      deliveryAddressId: this.editForm.get(['deliveryAddressId'])!.value,
      billToAddressId: this.editForm.get(['billToAddressId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomers>>): void {
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
