import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { LogisticsComponent } from 'app/entities/vscommerce/logistics/logistics.component';
import { LogisticsService } from 'app/entities/vscommerce/logistics/logistics.service';
import { Logistics } from 'app/shared/model/vscommerce/logistics.model';

describe('Component Tests', () => {
  describe('Logistics Management Component', () => {
    let comp: LogisticsComponent;
    let fixture: ComponentFixture<LogisticsComponent>;
    let service: LogisticsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LogisticsComponent],
      })
        .overrideTemplate(LogisticsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LogisticsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LogisticsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Logistics(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.logistics && comp.logistics[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
