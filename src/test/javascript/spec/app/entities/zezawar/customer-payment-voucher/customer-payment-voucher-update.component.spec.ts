import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentVoucherUpdateComponent } from 'app/entities/zezawar/customer-payment-voucher/customer-payment-voucher-update.component';
import { CustomerPaymentVoucherService } from 'app/entities/zezawar/customer-payment-voucher/customer-payment-voucher.service';
import { CustomerPaymentVoucher } from 'app/shared/model/zezawar/customer-payment-voucher.model';

describe('Component Tests', () => {
  describe('CustomerPaymentVoucher Management Update Component', () => {
    let comp: CustomerPaymentVoucherUpdateComponent;
    let fixture: ComponentFixture<CustomerPaymentVoucherUpdateComponent>;
    let service: CustomerPaymentVoucherService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentVoucherUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerPaymentVoucherUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentVoucherUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentVoucherService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerPaymentVoucher(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerPaymentVoucher();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
