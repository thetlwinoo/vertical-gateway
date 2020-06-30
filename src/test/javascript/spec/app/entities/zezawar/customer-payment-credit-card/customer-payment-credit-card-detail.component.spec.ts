import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentCreditCardDetailComponent } from 'app/entities/zezawar/customer-payment-credit-card/customer-payment-credit-card-detail.component';
import { CustomerPaymentCreditCard } from 'app/shared/model/zezawar/customer-payment-credit-card.model';

describe('Component Tests', () => {
  describe('CustomerPaymentCreditCard Management Detail Component', () => {
    let comp: CustomerPaymentCreditCardDetailComponent;
    let fixture: ComponentFixture<CustomerPaymentCreditCardDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ customerPaymentCreditCard: new CustomerPaymentCreditCard(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentCreditCardDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerPaymentCreditCardDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerPaymentCreditCardDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load customerPaymentCreditCard on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerPaymentCreditCard).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
