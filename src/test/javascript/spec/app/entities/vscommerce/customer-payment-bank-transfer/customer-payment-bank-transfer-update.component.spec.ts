import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentBankTransferUpdateComponent } from 'app/entities/vscommerce/customer-payment-bank-transfer/customer-payment-bank-transfer-update.component';
import { CustomerPaymentBankTransferService } from 'app/entities/vscommerce/customer-payment-bank-transfer/customer-payment-bank-transfer.service';
import { CustomerPaymentBankTransfer } from 'app/shared/model/vscommerce/customer-payment-bank-transfer.model';

describe('Component Tests', () => {
  describe('CustomerPaymentBankTransfer Management Update Component', () => {
    let comp: CustomerPaymentBankTransferUpdateComponent;
    let fixture: ComponentFixture<CustomerPaymentBankTransferUpdateComponent>;
    let service: CustomerPaymentBankTransferService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentBankTransferUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerPaymentBankTransferUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentBankTransferUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentBankTransferService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerPaymentBankTransfer(123);
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
        const entity = new CustomerPaymentBankTransfer();
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
