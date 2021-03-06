import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { ShoppingCartsDeleteDialogComponent } from 'app/entities/vscommerce/shopping-carts/shopping-carts-delete-dialog.component';
import { ShoppingCartsService } from 'app/entities/vscommerce/shopping-carts/shopping-carts.service';

describe('Component Tests', () => {
  describe('ShoppingCarts Management Delete Component', () => {
    let comp: ShoppingCartsDeleteDialogComponent;
    let fixture: ComponentFixture<ShoppingCartsDeleteDialogComponent>;
    let service: ShoppingCartsService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ShoppingCartsDeleteDialogComponent],
      })
        .overrideTemplate(ShoppingCartsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShoppingCartsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShoppingCartsService);
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
