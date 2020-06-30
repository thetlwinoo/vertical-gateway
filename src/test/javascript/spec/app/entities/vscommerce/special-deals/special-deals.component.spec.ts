import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { SpecialDealsComponent } from 'app/entities/vscommerce/special-deals/special-deals.component';
import { SpecialDealsService } from 'app/entities/vscommerce/special-deals/special-deals.service';
import { SpecialDeals } from 'app/shared/model/vscommerce/special-deals.model';

describe('Component Tests', () => {
  describe('SpecialDeals Management Component', () => {
    let comp: SpecialDealsComponent;
    let fixture: ComponentFixture<SpecialDealsComponent>;
    let service: SpecialDealsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SpecialDealsComponent],
      })
        .overrideTemplate(SpecialDealsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpecialDealsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpecialDealsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SpecialDeals(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.specialDeals && comp.specialDeals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
