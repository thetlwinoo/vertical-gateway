import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ColdRoomTemperaturesComponent } from 'app/entities/vscommerce/cold-room-temperatures/cold-room-temperatures.component';
import { ColdRoomTemperaturesService } from 'app/entities/vscommerce/cold-room-temperatures/cold-room-temperatures.service';
import { ColdRoomTemperatures } from 'app/shared/model/vscommerce/cold-room-temperatures.model';

describe('Component Tests', () => {
  describe('ColdRoomTemperatures Management Component', () => {
    let comp: ColdRoomTemperaturesComponent;
    let fixture: ComponentFixture<ColdRoomTemperaturesComponent>;
    let service: ColdRoomTemperaturesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ColdRoomTemperaturesComponent],
      })
        .overrideTemplate(ColdRoomTemperaturesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ColdRoomTemperaturesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ColdRoomTemperaturesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ColdRoomTemperatures(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.coldRoomTemperatures && comp.coldRoomTemperatures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
