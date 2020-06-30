import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { StockItemsDetailComponent } from 'app/entities/zezawar/stock-items/stock-items-detail.component';
import { StockItems } from 'app/shared/model/zezawar/stock-items.model';

describe('Component Tests', () => {
  describe('StockItems Management Detail Component', () => {
    let comp: StockItemsDetailComponent;
    let fixture: ComponentFixture<StockItemsDetailComponent>;
    const route = ({ data: of({ stockItems: new StockItems(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [StockItemsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(StockItemsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StockItemsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load stockItems on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.stockItems).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
