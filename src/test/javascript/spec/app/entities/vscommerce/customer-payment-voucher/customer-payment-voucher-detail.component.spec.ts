import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentVoucherDetailComponent } from 'app/entities/vscommerce/customer-payment-voucher/customer-payment-voucher-detail.component';
import { CustomerPaymentVoucher } from 'app/shared/model/vscommerce/customer-payment-voucher.model';

describe('Component Tests', () => {
  describe('CustomerPaymentVoucher Management Detail Component', () => {
    let comp: CustomerPaymentVoucherDetailComponent;
    let fixture: ComponentFixture<CustomerPaymentVoucherDetailComponent>;
    const route = ({ data: of({ customerPaymentVoucher: new CustomerPaymentVoucher(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentVoucherDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerPaymentVoucherDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerPaymentVoucherDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customerPaymentVoucher on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerPaymentVoucher).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
