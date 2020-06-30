import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CompareLinesComponent } from 'app/entities/vscommerce/compare-lines/compare-lines.component';
import { CompareLinesService } from 'app/entities/vscommerce/compare-lines/compare-lines.service';
import { CompareLines } from 'app/shared/model/vscommerce/compare-lines.model';

describe('Component Tests', () => {
  describe('CompareLines Management Component', () => {
    let comp: CompareLinesComponent;
    let fixture: ComponentFixture<CompareLinesComponent>;
    let service: CompareLinesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CompareLinesComponent],
      })
        .overrideTemplate(CompareLinesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CompareLinesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CompareLinesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CompareLines(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.compareLines && comp.compareLines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
