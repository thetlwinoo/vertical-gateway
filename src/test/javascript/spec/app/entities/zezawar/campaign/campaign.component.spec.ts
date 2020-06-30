import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CampaignComponent } from 'app/entities/zezawar/campaign/campaign.component';
import { CampaignService } from 'app/entities/zezawar/campaign/campaign.service';
import { Campaign } from 'app/shared/model/zezawar/campaign.model';

describe('Component Tests', () => {
  describe('Campaign Management Component', () => {
    let comp: CampaignComponent;
    let fixture: ComponentFixture<CampaignComponent>;
    let service: CampaignService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CampaignComponent],
      })
        .overrideTemplate(CampaignComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CampaignComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CampaignService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Campaign(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.campaigns && comp.campaigns[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
