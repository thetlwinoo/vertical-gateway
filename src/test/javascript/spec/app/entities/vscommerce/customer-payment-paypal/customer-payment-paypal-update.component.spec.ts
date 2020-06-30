import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentPaypalUpdateComponent } from 'app/entities/vscommerce/customer-payment-paypal/customer-payment-paypal-update.component';
import { CustomerPaymentPaypalService } from 'app/entities/vscommerce/customer-payment-paypal/customer-payment-paypal.service';
import { CustomerPaymentPaypal } from 'app/shared/model/vscommerce/customer-payment-paypal.model';

describe('Component Tests', () => {
  describe('CustomerPaymentPaypal Management Update Component', () => {
    let comp: CustomerPaymentPaypalUpdateComponent;
    let fixture: ComponentFixture<CustomerPaymentPaypalUpdateComponent>;
    let service: CustomerPaymentPaypalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentPaypalUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerPaymentPaypalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentPaypalUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentPaypalService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerPaymentPaypal(123);
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
        const entity = new CustomerPaymentPaypal();
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
