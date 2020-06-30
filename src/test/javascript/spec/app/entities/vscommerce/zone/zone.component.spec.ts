import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ZoneComponent } from 'app/entities/vscommerce/zone/zone.component';
import { ZoneService } from 'app/entities/vscommerce/zone/zone.service';
import { Zone } from 'app/shared/model/vscommerce/zone.model';

describe('Component Tests', () => {
  describe('Zone Management Component', () => {
    let comp: ZoneComponent;
    let fixture: ComponentFixture<ZoneComponent>;
    let service: ZoneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ZoneComponent],
      })
        .overrideTemplate(ZoneComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ZoneComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ZoneService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Zone(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.zones && comp.zones[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
