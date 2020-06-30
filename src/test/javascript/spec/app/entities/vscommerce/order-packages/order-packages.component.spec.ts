import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { OrderPackagesComponent } from 'app/entities/vscommerce/order-packages/order-packages.component';
import { OrderPackagesService } from 'app/entities/vscommerce/order-packages/order-packages.service';
import { OrderPackages } from 'app/shared/model/vscommerce/order-packages.model';

describe('Component Tests', () => {
  describe('OrderPackages Management Component', () => {
    let comp: OrderPackagesComponent;
    let fixture: ComponentFixture<OrderPackagesComponent>;
    let service: OrderPackagesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OrderPackagesComponent],
      })
        .overrideTemplate(OrderPackagesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderPackagesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderPackagesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrderPackages(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.orderPackages && comp.orderPackages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
