import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { StockItemTransactionsDetailComponent } from 'app/entities/vscommerce/stock-item-transactions/stock-item-transactions-detail.component';
import { StockItemTransactions } from 'app/shared/model/vscommerce/stock-item-transactions.model';

describe('Component Tests', () => {
  describe('StockItemTransactions Management Detail Component', () => {
    let comp: StockItemTransactionsDetailComponent;
    let fixture: ComponentFixture<StockItemTransactionsDetailComponent>;
    const route = ({ data: of({ stockItemTransactions: new StockItemTransactions(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [StockItemTransactionsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(StockItemTransactionsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StockItemTransactionsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load stockItemTransactions on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.stockItemTransactions).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
