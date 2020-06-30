import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentPaypalDetailComponent } from 'app/entities/vscommerce/customer-payment-paypal/customer-payment-paypal-detail.component';
import { CustomerPaymentPaypal } from 'app/shared/model/vscommerce/customer-payment-paypal.model';

describe('Component Tests', () => {
  describe('CustomerPaymentPaypal Management Detail Component', () => {
    let comp: CustomerPaymentPaypalDetailComponent;
    let fixture: ComponentFixture<CustomerPaymentPaypalDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ customerPaymentPaypal: new CustomerPaymentPaypal(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentPaypalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerPaymentPaypalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerPaymentPaypalDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load customerPaymentPaypal on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerPaymentPaypal).toEqual(jasmine.objectContaining({ id: 123 }));
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
