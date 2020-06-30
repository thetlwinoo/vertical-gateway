import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { OrderPackagesDetailComponent } from 'app/entities/vscommerce/order-packages/order-packages-detail.component';
import { OrderPackages } from 'app/shared/model/vscommerce/order-packages.model';

describe('Component Tests', () => {
  describe('OrderPackages Management Detail Component', () => {
    let comp: OrderPackagesDetailComponent;
    let fixture: ComponentFixture<OrderPackagesDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ orderPackages: new OrderPackages(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OrderPackagesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OrderPackagesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrderPackagesDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load orderPackages on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.orderPackages).toEqual(jasmine.objectContaining({ id: 123 }));
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
