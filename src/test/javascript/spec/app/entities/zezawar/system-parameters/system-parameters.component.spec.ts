import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { SystemParametersComponent } from 'app/entities/zezawar/system-parameters/system-parameters.component';
import { SystemParametersService } from 'app/entities/zezawar/system-parameters/system-parameters.service';
import { SystemParameters } from 'app/shared/model/zezawar/system-parameters.model';

describe('Component Tests', () => {
  describe('SystemParameters Management Component', () => {
    let comp: SystemParametersComponent;
    let fixture: ComponentFixture<SystemParametersComponent>;
    let service: SystemParametersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SystemParametersComponent],
      })
        .overrideTemplate(SystemParametersComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SystemParametersComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SystemParametersService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SystemParameters(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.systemParameters && comp.systemParameters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
