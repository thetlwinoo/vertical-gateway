export interface ICampaign {
  id?: number;
  name?: string;
  shortLabel?: string;
  sortOrder?: number;
  iconFont?: string;
  thumbnailUrl?: string;
  iconThumbnailUrl?: string;
  iconId?: number;
}

export class Campaign implements ICampaign {
  constructor(
    public id?: number,
    public name?: string,
    public shortLabel?: string,
    public sortOrder?: number,
    public iconFont?: string,
    public thumbnailUrl?: string,
    public iconThumbnailUrl?: string,
    public iconId?: number
  ) {}
}
