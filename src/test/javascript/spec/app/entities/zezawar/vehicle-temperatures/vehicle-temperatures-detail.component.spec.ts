import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { VehicleTemperaturesDetailComponent } from 'app/entities/zezawar/vehicle-temperatures/vehicle-temperatures-detail.component';
import { VehicleTemperatures } from 'app/shared/model/zezawar/vehicle-temperatures.model';

describe('Component Tests', () => {
  describe('VehicleTemperatures Management Detail Component', () => {
    let comp: VehicleTemperaturesDetailComponent;
    let fixture: ComponentFixture<VehicleTemperaturesDetailComponent>;
    const route = ({ data: of({ vehicleTemperatures: new VehicleTemperatures(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [VehicleTemperaturesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(VehicleTemperaturesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VehicleTemperaturesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load vehicleTemperatures on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.vehicleTemperatures).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
