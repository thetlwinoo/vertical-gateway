import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { StockItemTransactionsComponent } from 'app/entities/zezawar/stock-item-transactions/stock-item-transactions.component';
import { StockItemTransactionsService } from 'app/entities/zezawar/stock-item-transactions/stock-item-transactions.service';
import { StockItemTransactions } from 'app/shared/model/zezawar/stock-item-transactions.model';

describe('Component Tests', () => {
  describe('StockItemTransactions Management Component', () => {
    let comp: StockItemTransactionsComponent;
    let fixture: ComponentFixture<StockItemTransactionsComponent>;
    let service: StockItemTransactionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [StockItemTransactionsComponent],
      })
        .overrideTemplate(StockItemTransactionsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StockItemTransactionsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StockItemTransactionsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StockItemTransactions(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.stockItemTransactions && comp.stockItemTransactions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
