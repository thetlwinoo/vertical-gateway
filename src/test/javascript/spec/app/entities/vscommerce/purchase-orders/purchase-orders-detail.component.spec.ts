import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PurchaseOrdersDetailComponent } from 'app/entities/vscommerce/purchase-orders/purchase-orders-detail.component';
import { PurchaseOrders } from 'app/shared/model/vscommerce/purchase-orders.model';

describe('Component Tests', () => {
  describe('PurchaseOrders Management Detail Component', () => {
    let comp: PurchaseOrdersDetailComponent;
    let fixture: ComponentFixture<PurchaseOrdersDetailComponent>;
    const route = ({ data: of({ purchaseOrders: new PurchaseOrders(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PurchaseOrdersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PurchaseOrdersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchaseOrdersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load purchaseOrders on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.purchaseOrders).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
