import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentComponent } from 'app/entities/zezawar/customer-payment/customer-payment.component';
import { CustomerPaymentService } from 'app/entities/zezawar/customer-payment/customer-payment.service';
import { CustomerPayment } from 'app/shared/model/zezawar/customer-payment.model';

describe('Component Tests', () => {
  describe('CustomerPayment Management Component', () => {
    let comp: CustomerPaymentComponent;
    let fixture: ComponentFixture<CustomerPaymentComponent>;
    let service: CustomerPaymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentComponent],
      })
        .overrideTemplate(CustomerPaymentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerPayment(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerPayments && comp.customerPayments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
