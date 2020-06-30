import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerPaymentUpdateComponent } from 'app/entities/vscommerce/customer-payment/customer-payment-update.component';
import { CustomerPaymentService } from 'app/entities/vscommerce/customer-payment/customer-payment.service';
import { CustomerPayment } from 'app/shared/model/vscommerce/customer-payment.model';

describe('Component Tests', () => {
  describe('CustomerPayment Management Update Component', () => {
    let comp: CustomerPaymentUpdateComponent;
    let fixture: ComponentFixture<CustomerPaymentUpdateComponent>;
    let service: CustomerPaymentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomerPaymentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerPaymentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CustomerPayment(123);
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
        const entity = new CustomerPayment();
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
