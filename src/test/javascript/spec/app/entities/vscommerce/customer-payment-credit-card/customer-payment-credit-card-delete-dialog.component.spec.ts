import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { CustomerPaymentCreditCardDeleteDialogComponent } from 'app/entities/vscommerce/customer-payment-credit-card/customer-payment-credit-card-delete-dialog.component';
import { CustomerPaymentCreditCardService } from 'app/entities/vscommerce/customer-payment-credit-card/customer-payment-credit-card.service';

describe('Component Tests', () => {
  describe('CustomerPaymentCreditCard Management Delete Component', () => {
    let comp: CustomerPaymentCreditCardDeleteDialogComponent;
    let fixture: ComponentFixture<CustomerPaymentCreditCardDeleteDialogComponent>;
    let service: CustomerPaymentCreditCardService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerPaymentCreditCardDeleteDialogComponent],
      })
        .overrideTemplate(CustomerPaymentCreditCardDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerPaymentCreditCardDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerPaymentCreditCardService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
