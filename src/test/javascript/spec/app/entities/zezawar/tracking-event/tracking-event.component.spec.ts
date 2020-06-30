import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { TrackingEventComponent } from 'app/entities/zezawar/tracking-event/tracking-event.component';
import { TrackingEventService } from 'app/entities/zezawar/tracking-event/tracking-event.service';
import { TrackingEvent } from 'app/shared/model/zezawar/tracking-event.model';

describe('Component Tests', () => {
  describe('TrackingEvent Management Component', () => {
    let comp: TrackingEventComponent;
    let fixture: ComponentFixture<TrackingEventComponent>;
    let service: TrackingEventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TrackingEventComponent],
      })
        .overrideTemplate(TrackingEventComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrackingEventComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackingEventService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TrackingEvent(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.trackingEvents && comp.trackingEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
