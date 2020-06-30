import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentVoucherComponent } from 'app/entities/zezawar/customer-payment-voucher/customer-payment-voucher.component';
import { CustomerPaymentVoucherService } from 'app/entities/zezawar/customer-payment-voucher/customer-payment-voucher.service';
import { CustomerPaymentVoucher } from 'app/shared/model/zezawar/customer-payment-voucher.model';

describe('Component Tests', () => {
  describe('CustomerPaymentVoucher Management Component', () => {
    let comp: CustomerPaymentVoucherComponent;
    let fixture: ComponentFixture<CustomerPaymentVoucherComponent>;
    let service: CustomerPaymentVoucherService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentVoucherComponent],
      })
        .overrideTemplate(CustomerPaymentVoucherComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentVoucherComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentVoucherService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerPaymentVoucher(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerPaymentVouchers && comp.customerPaymentVouchers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
