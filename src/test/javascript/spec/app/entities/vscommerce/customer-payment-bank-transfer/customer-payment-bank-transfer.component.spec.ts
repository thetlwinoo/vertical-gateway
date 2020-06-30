import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentBankTransferComponent } from 'app/entities/vscommerce/customer-payment-bank-transfer/customer-payment-bank-transfer.component';
import { CustomerPaymentBankTransferService } from 'app/entities/vscommerce/customer-payment-bank-transfer/customer-payment-bank-transfer.service';
import { CustomerPaymentBankTransfer } from 'app/shared/model/vscommerce/customer-payment-bank-transfer.model';

describe('Component Tests', () => {
  describe('CustomerPaymentBankTransfer Management Component', () => {
    let comp: CustomerPaymentBankTransferComponent;
    let fixture: ComponentFixture<CustomerPaymentBankTransferComponent>;
    let service: CustomerPaymentBankTransferService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentBankTransferComponent],
      })
        .overrideTemplate(CustomerPaymentBankTransferComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentBankTransferComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentBankTransferService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerPaymentBankTransfer(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerPaymentBankTransfers && comp.customerPaymentBankTransfers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
