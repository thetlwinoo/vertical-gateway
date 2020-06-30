import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ComparesComponent } from 'app/entities/vscommerce/compares/compares.component';
import { ComparesService } from 'app/entities/vscommerce/compares/compares.service';
import { Compares } from 'app/shared/model/vscommerce/compares.model';

describe('Component Tests', () => {
  describe('Compares Management Component', () => {
    let comp: ComparesComponent;
    let fixture: ComponentFixture<ComparesComponent>;
    let service: ComparesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ComparesComponent],
      })
        .overrideTemplate(ComparesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ComparesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ComparesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Compares(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.compares && comp.compares[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
