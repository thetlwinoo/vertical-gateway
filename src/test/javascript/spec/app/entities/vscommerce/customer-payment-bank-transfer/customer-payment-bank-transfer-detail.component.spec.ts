import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentBankTransferDetailComponent } from 'app/entities/vscommerce/customer-payment-bank-transfer/customer-payment-bank-transfer-detail.component';
import { CustomerPaymentBankTransfer } from 'app/shared/model/vscommerce/customer-payment-bank-transfer.model';

describe('Component Tests', () => {
  describe('CustomerPaymentBankTransfer Management Detail Component', () => {
    let comp: CustomerPaymentBankTransferDetailComponent;
    let fixture: ComponentFixture<CustomerPaymentBankTransferDetailComponent>;
    const route = ({ data: of({ customerPaymentBankTransfer: new CustomerPaymentBankTransfer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentBankTransferDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerPaymentBankTransferDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerPaymentBankTransferDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customerPaymentBankTransfer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerPaymentBankTransfer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
