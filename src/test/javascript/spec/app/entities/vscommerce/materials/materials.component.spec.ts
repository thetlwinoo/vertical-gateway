import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { MaterialsComponent } from 'app/entities/vscommerce/materials/materials.component';
import { MaterialsService } from 'app/entities/vscommerce/materials/materials.service';
import { Materials } from 'app/shared/model/vscommerce/materials.model';

describe('Component Tests', () => {
  describe('Materials Management Component', () => {
    let comp: MaterialsComponent;
    let fixture: ComponentFixture<MaterialsComponent>;
    let service: MaterialsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MaterialsComponent],
      })
        .overrideTemplate(MaterialsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MaterialsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MaterialsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Materials(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.materials && comp.materials[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
