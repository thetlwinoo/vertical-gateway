import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICampaign, Campaign } from 'app/shared/model/vscommerce/campaign.model';
import { CampaignService } from './campaign.service';
import { IPhotos } from 'app/shared/model/vscommerce/photos.model';
import { PhotosService } from 'app/entities/vscommerce/photos/photos.service';

@Component({
  selector: 'jhi-campaign-update',
  templateUrl: './campaign-update.component.html',
})
export class CampaignUpdateComponent implements OnInit {
  isSaving = false;
  photos: IPhotos[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    shortLabel: [],
    sortOrder: [],
    iconFont: [],
    thumbnailUrl: [],
    iconId: [],
  });

  constructor(
    protected campaignService: CampaignService,
    protected photosService: PhotosService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ campaign }) => {
      this.updateForm(campaign);

      this.photosService.query().subscribe((res: HttpResponse<IPhotos[]>) => (this.photos = res.body || []));
    });
  }

  updateForm(campaign: ICampaign): void {
    this.editForm.patchValue({
      id: campaign.id,
      name: campaign.name,
      shortLabel: campaign.shortLabel,
      sortOrder: campaign.sortOrder,
      iconFont: campaign.iconFont,
      thumbnailUrl: campaign.thumbnailUrl,
      iconId: campaign.iconId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const campaign = this.createFromForm();
    if (campaign.id !== undefined) {
      this.subscribeToSaveResponse(this.campaignService.update(campaign));
    } else {
      this.subscribeToSaveResponse(this.campaignService.create(campaign));
    }
  }

  private createFromForm(): ICampaign {
    return {
      ...new Campaign(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      shortLabel: this.editForm.get(['shortLabel'])!.value,
      sortOrder: this.editForm.get(['sortOrder'])!.value,
      iconFont: this.editForm.get(['iconFont'])!.value,
      thumbnailUrl: this.editForm.get(['thumbnailUrl'])!.value,
      iconId: this.editForm.get(['iconId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICampaign>>): void {
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

  trackById(index: number, item: IPhotos): any {
    return item.id;
  }
}
