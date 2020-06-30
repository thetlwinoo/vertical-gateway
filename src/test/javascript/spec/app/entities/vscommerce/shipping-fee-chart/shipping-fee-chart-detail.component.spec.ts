import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ShippingFeeChartDetailComponent } from 'app/entities/vscommerce/shipping-fee-chart/shipping-fee-chart-detail.component';
import { ShippingFeeChart } from 'app/shared/model/vscommerce/shipping-fee-chart.model';

describe('Component Tests', () => {
  describe('ShippingFeeChart Management Detail Component', () => {
    let comp: ShippingFeeChartDetailComponent;
    let fixture: ComponentFixture<ShippingFeeChartDetailComponent>;
    const route = ({ data: of({ shippingFeeChart: new ShippingFeeChart(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ShippingFeeChartDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ShippingFeeChartDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShippingFeeChartDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load shippingFeeChart on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shippingFeeChart).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
