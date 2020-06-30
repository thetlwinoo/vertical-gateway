import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CultureComponent } from 'app/entities/vscommerce/culture/culture.component';
import { CultureService } from 'app/entities/vscommerce/culture/culture.service';
import { Culture } from 'app/shared/model/vscommerce/culture.model';

describe('Component Tests', () => {
  describe('Culture Management Component', () => {
    let comp: CultureComponent;
    let fixture: ComponentFixture<CultureComponent>;
    let service: CultureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CultureComponent],
      })
        .overrideTemplate(CultureComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CultureComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CultureService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Culture(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cultures && comp.cultures[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
