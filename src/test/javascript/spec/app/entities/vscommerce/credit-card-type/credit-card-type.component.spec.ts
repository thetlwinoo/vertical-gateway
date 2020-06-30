import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CreditCardTypeComponent } from 'app/entities/vscommerce/credit-card-type/credit-card-type.component';
import { CreditCardTypeService } from 'app/entities/vscommerce/credit-card-type/credit-card-type.service';
import { CreditCardType } from 'app/shared/model/vscommerce/credit-card-type.model';

describe('Component Tests', () => {
  describe('CreditCardType Management Component', () => {
    let comp: CreditCardTypeComponent;
    let fixture: ComponentFixture<CreditCardTypeComponent>;
    let service: CreditCardTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CreditCardTypeComponent],
      })
        .overrideTemplate(CreditCardTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CreditCardTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CreditCardTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CreditCardType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.creditCardTypes && comp.creditCardTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
