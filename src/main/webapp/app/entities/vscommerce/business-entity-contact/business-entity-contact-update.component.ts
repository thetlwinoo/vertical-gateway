import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBusinessEntityContact, BusinessEntityContact } from 'app/shared/model/vscommerce/business-entity-contact.model';
import { BusinessEntityContactService } from './business-entity-contact.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { IContactType } from 'app/shared/model/vscommerce/contact-type.model';
import { ContactTypeService } from 'app/entities/vscommerce/contact-type/contact-type.service';

type SelectableEntity = IPeople | IContactType;

@Component({
  selector: 'jhi-business-entity-contact-update',
  templateUrl: './business-entity-contact-update.component.html',
})
export class BusinessEntityContactUpdateComponent implements OnInit {
  isSaving = false;
  people: IPeople[] = [];
  contacttypes: IContactType[] = [];

  editForm = this.fb.group({
    id: [],
    personId: [],
    contactTypeId: [],
  });

  constructor(
    protected businessEntityContactService: BusinessEntityContactService,
    protected peopleService: PeopleService,
    protected contactTypeService: ContactTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ businessEntityContact }) => {
      this.updateForm(businessEntityContact);

      this.peopleService.query().subscribe((res: HttpResponse<IPeople[]>) => (this.people = res.body || []));

      this.contactTypeService.query().subscribe((res: HttpResponse<IContactType[]>) => (this.contacttypes = res.body || []));
    });
  }

  updateForm(businessEntityContact: IBusinessEntityContact): void {
    this.editForm.patchValue({
      id: businessEntityContact.id,
      personId: businessEntityContact.personId,
      contactTypeId: businessEntityContact.contactTypeId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const businessEntityContact = this.createFromForm();
    if (businessEntityContact.id !== undefined) {
      this.subscribeToSaveResponse(this.businessEntityContactService.update(businessEntityContact));
    } else {
      this.subscribeToSaveResponse(this.businessEntityContactService.create(businessEntityContact));
    }
  }

  private createFromForm(): IBusinessEntityContact {
    return {
      ...new BusinessEntityContact(),
      id: this.editForm.get(['id'])!.value,
      personId: this.editForm.get(['personId'])!.value,
      contactTypeId: this.editForm.get(['contactTypeId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBusinessEntityContact>>): void {
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
