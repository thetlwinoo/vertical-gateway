import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { DiscountTypesComponent } from 'app/entities/vscommerce/discount-types/discount-types.component';
import { DiscountTypesService } from 'app/entities/vscommerce/discount-types/discount-types.service';
import { DiscountTypes } from 'app/shared/model/vscommerce/discount-types.model';

describe('Component Tests', () => {
  describe('DiscountTypes Management Component', () => {
    let comp: DiscountTypesComponent;
    let fixture: ComponentFixture<DiscountTypesComponent>;
    let service: DiscountTypesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiscountTypesComponent],
      })
        .overrideTemplate(DiscountTypesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiscountTypesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiscountTypesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DiscountTypes(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.discountTypes && comp.discountTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
