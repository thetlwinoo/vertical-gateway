import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PurchaseOrderLinesComponent } from 'app/entities/zezawar/purchase-order-lines/purchase-order-lines.component';
import { PurchaseOrderLinesService } from 'app/entities/zezawar/purchase-order-lines/purchase-order-lines.service';
import { PurchaseOrderLines } from 'app/shared/model/zezawar/purchase-order-lines.model';

describe('Component Tests', () => {
  describe('PurchaseOrderLines Management Component', () => {
    let comp: PurchaseOrderLinesComponent;
    let fixture: ComponentFixture<PurchaseOrderLinesComponent>;
    let service: PurchaseOrderLinesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PurchaseOrderLinesComponent],
      })
        .overrideTemplate(PurchaseOrderLinesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchaseOrderLinesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchaseOrderLinesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PurchaseOrderLines(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.purchaseOrderLines && comp.purchaseOrderLines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
