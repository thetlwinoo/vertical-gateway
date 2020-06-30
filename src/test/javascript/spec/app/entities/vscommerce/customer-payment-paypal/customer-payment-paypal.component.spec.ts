import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentPaypalComponent } from 'app/entities/vscommerce/customer-payment-paypal/customer-payment-paypal.component';
import { CustomerPaymentPaypalService } from 'app/entities/vscommerce/customer-payment-paypal/customer-payment-paypal.service';
import { CustomerPaymentPaypal } from 'app/shared/model/vscommerce/customer-payment-paypal.model';

describe('Component Tests', () => {
  describe('CustomerPaymentPaypal Management Component', () => {
    let comp: CustomerPaymentPaypalComponent;
    let fixture: ComponentFixture<CustomerPaymentPaypalComponent>;
    let service: CustomerPaymentPaypalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentPaypalComponent],
      })
        .overrideTemplate(CustomerPaymentPaypalComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentPaypalComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentPaypalService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerPaymentPaypal(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerPaymentPaypals && comp.customerPaymentPaypals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
