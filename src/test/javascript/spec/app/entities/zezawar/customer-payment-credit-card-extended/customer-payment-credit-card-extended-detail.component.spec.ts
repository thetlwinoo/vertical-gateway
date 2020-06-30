import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentCreditCardExtendedDetailComponent } from 'app/entities/zezawar/customer-payment-credit-card-extended/customer-payment-credit-card-extended-detail.component';
import { CustomerPaymentCreditCardExtended } from 'app/shared/model/zezawar/customer-payment-credit-card-extended.model';

describe('Component Tests', () => {
  describe('CustomerPaymentCreditCardExtended Management Detail Component', () => {
    let comp: CustomerPaymentCreditCardExtendedDetailComponent;
    let fixture: ComponentFixture<CustomerPaymentCreditCardExtendedDetailComponent>;
    const route = ({
      data: of({ customerPaymentCreditCardExtended: new CustomerPaymentCreditCardExtended(123) }),
    } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentCreditCardExtendedDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerPaymentCreditCardExtendedDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerPaymentCreditCardExtendedDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customerPaymentCreditCardExtended on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerPaymentCreditCardExtended).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
