import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentCreditCardExtendedComponent } from 'app/entities/vscommerce/customer-payment-credit-card-extended/customer-payment-credit-card-extended.component';
import { CustomerPaymentCreditCardExtendedService } from 'app/entities/vscommerce/customer-payment-credit-card-extended/customer-payment-credit-card-extended.service';
import { CustomerPaymentCreditCardExtended } from 'app/shared/model/vscommerce/customer-payment-credit-card-extended.model';

describe('Component Tests', () => {
  describe('CustomerPaymentCreditCardExtended Management Component', () => {
    let comp: CustomerPaymentCreditCardExtendedComponent;
    let fixture: ComponentFixture<CustomerPaymentCreditCardExtendedComponent>;
    let service: CustomerPaymentCreditCardExtendedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentCreditCardExtendedComponent],
      })
        .overrideTemplate(CustomerPaymentCreditCardExtendedComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentCreditCardExtendedComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentCreditCardExtendedService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerPaymentCreditCardExtended(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerPaymentCreditCardExtendeds && comp.customerPaymentCreditCardExtendeds[0]).toEqual(
        jasmine.objectContaining({ id: 123 })
      );
    });
  });
});
