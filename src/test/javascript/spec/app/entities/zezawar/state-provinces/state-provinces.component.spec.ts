import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { StateProvincesComponent } from 'app/entities/zezawar/state-provinces/state-provinces.component';
import { StateProvincesService } from 'app/entities/zezawar/state-provinces/state-provinces.service';
import { StateProvinces } from 'app/shared/model/zezawar/state-provinces.model';

describe('Component Tests', () => {
  describe('StateProvinces Management Component', () => {
    let comp: StateProvincesComponent;
    let fixture: ComponentFixture<StateProvincesComponent>;
    let service: StateProvincesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [StateProvincesComponent],
      })
        .overrideTemplate(StateProvincesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StateProvincesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StateProvincesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StateProvinces(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.stateProvinces && comp.stateProvinces[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
