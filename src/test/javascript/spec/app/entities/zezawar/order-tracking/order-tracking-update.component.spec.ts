import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { OrderTrackingUpdateComponent } from 'app/entities/zezawar/order-tracking/order-tracking-update.component';
import { OrderTrackingService } from 'app/entities/zezawar/order-tracking/order-tracking.service';
import { OrderTracking } from 'app/shared/model/zezawar/order-tracking.model';

describe('Component Tests', () => {
  describe('OrderTracking Management Update Component', () => {
    let comp: OrderTrackingUpdateComponent;
    let fixture: ComponentFixture<OrderTrackingUpdateComponent>;
    let service: OrderTrackingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OrderTrackingUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OrderTrackingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderTrackingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderTrackingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderTracking(123);
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
        const entity = new OrderTracking();
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
