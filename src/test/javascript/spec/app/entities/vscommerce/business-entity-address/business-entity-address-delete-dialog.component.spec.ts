import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { BusinessEntityAddressDeleteDialogComponent } from 'app/entities/vscommerce/business-entity-address/business-entity-address-delete-dialog.component';
import { BusinessEntityAddressService } from 'app/entities/vscommerce/business-entity-address/business-entity-address.service';

describe('Component Tests', () => {
  describe('BusinessEntityAddress Management Delete Component', () => {
    let comp: BusinessEntityAddressDeleteDialogComponent;
    let fixture: ComponentFixture<BusinessEntityAddressDeleteDialogComponent>;
    let service: BusinessEntityAddressService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BusinessEntityAddressDeleteDialogComponent],
      })
        .overrideTemplate(BusinessEntityAddressDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BusinessEntityAddressDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BusinessEntityAddressService);
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
