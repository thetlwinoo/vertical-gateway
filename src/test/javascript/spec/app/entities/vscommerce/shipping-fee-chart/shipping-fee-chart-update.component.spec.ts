import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ShippingFeeChartUpdateComponent } from 'app/entities/vscommerce/shipping-fee-chart/shipping-fee-chart-update.component';
import { ShippingFeeChartService } from 'app/entities/vscommerce/shipping-fee-chart/shipping-fee-chart.service';
import { ShippingFeeChart } from 'app/shared/model/vscommerce/shipping-fee-chart.model';

describe('Component Tests', () => {
  describe('ShippingFeeChart Management Update Component', () => {
    let comp: ShippingFeeChartUpdateComponent;
    let fixture: ComponentFixture<ShippingFeeChartUpdateComponent>;
    let service: ShippingFeeChartService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ShippingFeeChartUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ShippingFeeChartUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShippingFeeChartUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShippingFeeChartService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ShippingFeeChart(123);
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
        const entity = new ShippingFeeChart();
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
