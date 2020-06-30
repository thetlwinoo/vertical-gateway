import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductSetDetailPriceComponent } from 'app/entities/vscommerce/product-set-detail-price/product-set-detail-price.component';
import { ProductSetDetailPriceService } from 'app/entities/vscommerce/product-set-detail-price/product-set-detail-price.service';
import { ProductSetDetailPrice } from 'app/shared/model/vscommerce/product-set-detail-price.model';

describe('Component Tests', () => {
  describe('ProductSetDetailPrice Management Component', () => {
    let comp: ProductSetDetailPriceComponent;
    let fixture: ComponentFixture<ProductSetDetailPriceComponent>;
    let service: ProductSetDetailPriceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductSetDetailPriceComponent],
      })
        .overrideTemplate(ProductSetDetailPriceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductSetDetailPriceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductSetDetailPriceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductSetDetailPrice(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productSetDetailPrices && comp.productSetDetailPrices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
