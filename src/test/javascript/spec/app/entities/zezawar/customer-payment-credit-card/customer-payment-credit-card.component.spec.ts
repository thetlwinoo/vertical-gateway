import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentCreditCardComponent } from 'app/entities/zezawar/customer-payment-credit-card/customer-payment-credit-card.component';
import { CustomerPaymentCreditCardService } from 'app/entities/zezawar/customer-payment-credit-card/customer-payment-credit-card.service';
import { CustomerPaymentCreditCard } from 'app/shared/model/zezawar/customer-payment-credit-card.model';

describe('Component Tests', () => {
  describe('CustomerPaymentCreditCard Management Component', () => {
    let comp: CustomerPaymentCreditCardComponent;
    let fixture: ComponentFixture<CustomerPaymentCreditCardComponent>;
    let service: CustomerPaymentCreditCardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentCreditCardComponent],
      })
        .overrideTemplate(CustomerPaymentCreditCardComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentCreditCardComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentCreditCardService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerPaymentCreditCard(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerPaymentCreditCards && comp.customerPaymentCreditCards[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
