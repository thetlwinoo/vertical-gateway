import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TrackingEventUpdateComponent } from 'app/entities/vscommerce/tracking-event/tracking-event-update.component';
import { TrackingEventService } from 'app/entities/vscommerce/tracking-event/tracking-event.service';
import { TrackingEvent } from 'app/shared/model/vscommerce/tracking-event.model';

describe('Component Tests', () => {
  describe('TrackingEvent Management Update Component', () => {
    let comp: TrackingEventUpdateComponent;
    let fixture: ComponentFixture<TrackingEventUpdateComponent>;
    let service: TrackingEventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TrackingEventUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TrackingEventUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrackingEventUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackingEventService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TrackingEvent(123);
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
        const entity = new TrackingEvent();
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
