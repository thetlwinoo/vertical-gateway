import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentCreditCardUpdateComponent } from 'app/entities/zezawar/customer-payment-credit-card/customer-payment-credit-card-update.component';
import { CustomerPaymentCreditCardService } from 'app/entities/zezawar/customer-payment-credit-card/customer-payment-credit-card.service';
import { CustomerPaymentCreditCard } from 'app/shared/model/zezawar/customer-payment-credit-card.model';

describe('Component Tests', () => {
  describe('CustomerPaymentCreditCard Management Update Component', () => {
    let comp: CustomerPaymentCreditCardUpdateComponent;
    let fixture: ComponentFixture<CustomerPaymentCreditCardUpdateComponent>;
    let service: CustomerPaymentCreditCardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentCreditCardUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerPaymentCreditCardUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentCreditCardUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentCreditCardService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerPaymentCreditCard(123);
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
        const entity = new CustomerPaymentCreditCard();
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
