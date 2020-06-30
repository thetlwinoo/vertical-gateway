import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TrackingEventDetailComponent } from 'app/entities/zezawar/tracking-event/tracking-event-detail.component';
import { TrackingEvent } from 'app/shared/model/zezawar/tracking-event.model';

describe('Component Tests', () => {
  describe('TrackingEvent Management Detail Component', () => {
    let comp: TrackingEventDetailComponent;
    let fixture: ComponentFixture<TrackingEventDetailComponent>;
    const route = ({ data: of({ trackingEvent: new TrackingEvent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TrackingEventDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TrackingEventDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrackingEventDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load trackingEvent on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.trackingEvent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
