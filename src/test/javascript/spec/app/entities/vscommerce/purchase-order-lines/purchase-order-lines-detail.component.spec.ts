import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PurchaseOrderLinesDetailComponent } from 'app/entities/vscommerce/purchase-order-lines/purchase-order-lines-detail.component';
import { PurchaseOrderLines } from 'app/shared/model/vscommerce/purchase-order-lines.model';

describe('Component Tests', () => {
  describe('PurchaseOrderLines Management Detail Component', () => {
    let comp: PurchaseOrderLinesDetailComponent;
    let fixture: ComponentFixture<PurchaseOrderLinesDetailComponent>;
    const route = ({ data: of({ purchaseOrderLines: new PurchaseOrderLines(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PurchaseOrderLinesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PurchaseOrderLinesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchaseOrderLinesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load purchaseOrderLines on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.purchaseOrderLines).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
