import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentCreditCardExtendedUpdateComponent } from 'app/entities/zezawar/customer-payment-credit-card-extended/customer-payment-credit-card-extended-update.component';
import { CustomerPaymentCreditCardExtendedService } from 'app/entities/zezawar/customer-payment-credit-card-extended/customer-payment-credit-card-extended.service';
import { CustomerPaymentCreditCardExtended } from 'app/shared/model/zezawar/customer-payment-credit-card-extended.model';

describe('Component Tests', () => {
  describe('CustomerPaymentCreditCardExtended Management Update Component', () => {
    let comp: CustomerPaymentCreditCardExtendedUpdateComponent;
    let fixture: ComponentFixture<CustomerPaymentCreditCardExtendedUpdateComponent>;
    let service: CustomerPaymentCreditCardExtendedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentCreditCardExtendedUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerPaymentCreditCardExtendedUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentCreditCardExtendedUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentCreditCardExtendedService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerPaymentCreditCardExtended(123);
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
        const entity = new CustomerPaymentCreditCardExtended();
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
