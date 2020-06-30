import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SupplierTransactionStatusUpdateComponent } from 'app/entities/vscommerce/supplier-transaction-status/supplier-transaction-status-update.component';
import { SupplierTransactionStatusService } from 'app/entities/vscommerce/supplier-transaction-status/supplier-transaction-status.service';
import { SupplierTransactionStatus } from 'app/shared/model/vscommerce/supplier-transaction-status.model';

describe('Component Tests', () => {
  describe('SupplierTransactionStatus Management Update Component', () => {
    let comp: SupplierTransactionStatusUpdateComponent;
    let fixture: ComponentFixture<SupplierTransactionStatusUpdateComponent>;
    let service: SupplierTransactionStatusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SupplierTransactionStatusUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SupplierTransactionStatusUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupplierTransactionStatusUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupplierTransactionStatusService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SupplierTransactionStatus(123);
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
        const entity = new SupplierTransactionStatus();
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
