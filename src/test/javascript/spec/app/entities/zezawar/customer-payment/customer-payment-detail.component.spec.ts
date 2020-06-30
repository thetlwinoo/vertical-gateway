import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentDetailComponent } from 'app/entities/zezawar/customer-payment/customer-payment-detail.component';
import { CustomerPayment } from 'app/shared/model/zezawar/customer-payment.model';

describe('Component Tests', () => {
  describe('CustomerPayment Management Detail Component', () => {
    let comp: CustomerPaymentDetailComponent;
    let fixture: ComponentFixture<CustomerPaymentDetailComponent>;
    const route = ({ data: of({ customerPayment: new CustomerPayment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerPaymentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerPaymentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customerPayment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerPayment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
