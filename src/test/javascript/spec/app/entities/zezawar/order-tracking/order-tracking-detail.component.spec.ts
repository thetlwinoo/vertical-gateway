import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { OrderTrackingDetailComponent } from 'app/entities/zezawar/order-tracking/order-tracking-detail.component';
import { OrderTracking } from 'app/shared/model/zezawar/order-tracking.model';

describe('Component Tests', () => {
  describe('OrderTracking Management Detail Component', () => {
    let comp: OrderTrackingDetailComponent;
    let fixture: ComponentFixture<OrderTrackingDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ orderTracking: new OrderTracking(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OrderTrackingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OrderTrackingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderTrackingDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load orderTracking on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orderTracking).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
