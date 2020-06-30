import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IWishlists, Wishlists } from 'app/shared/model/vscommerce/wishlists.model';
import { WishlistsService } from './wishlists.service';
import { IPeople } from 'app/shared/model/vscommerce/people.model';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';

@Component({
  selector: 'jhi-wishlists-update',
  templateUrl: './wishlists-update.component.html',
})
export class WishlistsUpdateComponent implements OnInit {
  isSaving = false;
  wishlistusers: IPeople[] = [];

  editForm = this.fb.group({
    id: [],
    wishlistUserId: [],
  });

  constructor(
    protected wishlistsService: WishlistsService,
    protected peopleService: PeopleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ wishlists }) => {
      this.updateForm(wishlists);

      this.peopleService
        .query({ 'wishlistId.specified': 'false' })
        .pipe(
          map((res: HttpResponse<IPeople[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPeople[]) => {
          if (!wishlists.wishlistUserId) {
            this.wishlistusers = resBody;
          } else {
            this.peopleService
              .find(wishlists.wishlistUserId)
              .pipe(
                map((subRes: HttpResponse<IPeople>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPeople[]) => (this.wishlistusers = concatRes));
          }
        });
    });
  }

  updateForm(wishlists: IWishlists): void {
    this.editForm.patchValue({
      id: wishlists.id,
      wishlistUserId: wishlists.wishlistUserId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const wishlists = this.createFromForm();
    if (wishlists.id !== undefined) {
      this.subscribeToSaveResponse(this.wishlistsService.update(wishlists));
    } else {
      this.subscribeToSaveResponse(this.wishlistsService.create(wishlists));
    }
  }

  private createFromForm(): IWishlists {
    return {
      ...new Wishlists(),
      id: this.editForm.get(['id'])!.value,
      wishlistUserId: this.editForm.get(['wishlistUserId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IWishlists>>): void {
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
