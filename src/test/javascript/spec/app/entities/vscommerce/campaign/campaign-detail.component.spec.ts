import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CampaignDetailComponent } from 'app/entities/vscommerce/campaign/campaign-detail.component';
import { Campaign } from 'app/shared/model/vscommerce/campaign.model';

describe('Component Tests', () => {
  describe('Campaign Management Detail Component', () => {
    let comp: CampaignDetailComponent;
    let fixture: ComponentFixture<CampaignDetailComponent>;
    const route = ({ data: of({ campaign: new Campaign(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CampaignDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CampaignDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CampaignDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load campaign on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.campaign).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
