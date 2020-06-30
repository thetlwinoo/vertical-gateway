import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductListPriceHistoryComponent } from 'app/entities/zezawar/product-list-price-history/product-list-price-history.component';
import { ProductListPriceHistoryService } from 'app/entities/zezawar/product-list-price-history/product-list-price-history.service';
import { ProductListPriceHistory } from 'app/shared/model/zezawar/product-list-price-history.model';

describe('Component Tests', () => {
  describe('ProductListPriceHistory Management Component', () => {
    let comp: ProductListPriceHistoryComponent;
    let fixture: ComponentFixture<ProductListPriceHistoryComponent>;
    let service: ProductListPriceHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductListPriceHistoryComponent],
      })
        .overrideTemplate(ProductListPriceHistoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductListPriceHistoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductListPriceHistoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductListPriceHistory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productListPriceHistories && comp.productListPriceHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
