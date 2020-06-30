import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { DiscountDetailsComponent } from 'app/entities/zezawar/discount-details/discount-details.component';
import { DiscountDetailsService } from 'app/entities/zezawar/discount-details/discount-details.service';
import { DiscountDetails } from 'app/shared/model/zezawar/discount-details.model';

describe('Component Tests', () => {
  describe('DiscountDetails Management Component', () => {
    let comp: DiscountDetailsComponent;
    let fixture: ComponentFixture<DiscountDetailsComponent>;
    let service: DiscountDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiscountDetailsComponent],
      })
        .overrideTemplate(DiscountDetailsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiscountDetailsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiscountDetailsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DiscountDetails(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.discountDetails && comp.discountDetails[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
