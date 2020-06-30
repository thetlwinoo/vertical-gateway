import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { TaxClassComponent } from 'app/entities/vscommerce/tax-class/tax-class.component';
import { TaxClassService } from 'app/entities/vscommerce/tax-class/tax-class.service';
import { TaxClass } from 'app/shared/model/vscommerce/tax-class.model';

describe('Component Tests', () => {
  describe('TaxClass Management Component', () => {
    let comp: TaxClassComponent;
    let fixture: ComponentFixture<TaxClassComponent>;
    let service: TaxClassService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TaxClassComponent],
      })
        .overrideTemplate(TaxClassComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaxClassComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaxClassService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TaxClass(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.taxClasses && comp.taxClasses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
