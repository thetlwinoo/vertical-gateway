import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ShipMethodComponent } from 'app/entities/vscommerce/ship-method/ship-method.component';
import { ShipMethodService } from 'app/entities/vscommerce/ship-method/ship-method.service';
import { ShipMethod } from 'app/shared/model/vscommerce/ship-method.model';

describe('Component Tests', () => {
  describe('ShipMethod Management Component', () => {
    let comp: ShipMethodComponent;
    let fixture: ComponentFixture<ShipMethodComponent>;
    let service: ShipMethodService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ShipMethodComponent],
      })
        .overrideTemplate(ShipMethodComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShipMethodComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShipMethodService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ShipMethod(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.shipMethods && comp.shipMethods[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
