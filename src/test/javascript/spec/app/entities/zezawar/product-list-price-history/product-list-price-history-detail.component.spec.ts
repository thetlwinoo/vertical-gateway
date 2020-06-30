import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductListPriceHistoryDetailComponent } from 'app/entities/zezawar/product-list-price-history/product-list-price-history-detail.component';
import { ProductListPriceHistory } from 'app/shared/model/zezawar/product-list-price-history.model';

describe('Component Tests', () => {
  describe('ProductListPriceHistory Management Detail Component', () => {
    let comp: ProductListPriceHistoryDetailComponent;
    let fixture: ComponentFixture<ProductListPriceHistoryDetailComponent>;
    const route = ({ data: of({ productListPriceHistory: new ProductListPriceHistory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductListPriceHistoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductListPriceHistoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductListPriceHistoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productListPriceHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productListPriceHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
