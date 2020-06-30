import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ShippingFeeChartComponent } from 'app/entities/vscommerce/shipping-fee-chart/shipping-fee-chart.component';
import { ShippingFeeChartService } from 'app/entities/vscommerce/shipping-fee-chart/shipping-fee-chart.service';
import { ShippingFeeChart } from 'app/shared/model/vscommerce/shipping-fee-chart.model';

describe('Component Tests', () => {
  describe('ShippingFeeChart Management Component', () => {
    let comp: ShippingFeeChartComponent;
    let fixture: ComponentFixture<ShippingFeeChartComponent>;
    let service: ShippingFeeChartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ShippingFeeChartComponent],
      })
        .overrideTemplate(ShippingFeeChartComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShippingFeeChartComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShippingFeeChartService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ShippingFeeChart(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.shippingFeeCharts && comp.shippingFeeCharts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
