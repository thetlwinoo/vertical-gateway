import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { UnitMeasureComponent } from 'app/entities/vscommerce/unit-measure/unit-measure.component';
import { UnitMeasureService } from 'app/entities/vscommerce/unit-measure/unit-measure.service';
import { UnitMeasure } from 'app/shared/model/vscommerce/unit-measure.model';

describe('Component Tests', () => {
  describe('UnitMeasure Management Component', () => {
    let comp: UnitMeasureComponent;
    let fixture: ComponentFixture<UnitMeasureComponent>;
    let service: UnitMeasureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UnitMeasureComponent],
      })
        .overrideTemplate(UnitMeasureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnitMeasureComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnitMeasureService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UnitMeasure(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.unitMeasures && comp.unitMeasures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
