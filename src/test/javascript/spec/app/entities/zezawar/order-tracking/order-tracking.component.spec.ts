import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { OrderTrackingComponent } from 'app/entities/zezawar/order-tracking/order-tracking.component';
import { OrderTrackingService } from 'app/entities/zezawar/order-tracking/order-tracking.service';
import { OrderTracking } from 'app/shared/model/zezawar/order-tracking.model';

describe('Component Tests', () => {
  describe('OrderTracking Management Component', () => {
    let comp: OrderTrackingComponent;
    let fixture: ComponentFixture<OrderTrackingComponent>;
    let service: OrderTrackingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OrderTrackingComponent],
      })
        .overrideTemplate(OrderTrackingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderTrackingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderTrackingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrderTracking(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.orderTrackings && comp.orderTrackings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
