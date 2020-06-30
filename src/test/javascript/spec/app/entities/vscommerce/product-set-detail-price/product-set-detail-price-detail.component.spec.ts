import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductSetDetailPriceDetailComponent } from 'app/entities/vscommerce/product-set-detail-price/product-set-detail-price-detail.component';
import { ProductSetDetailPrice } from 'app/shared/model/vscommerce/product-set-detail-price.model';

describe('Component Tests', () => {
  describe('ProductSetDetailPrice Management Detail Component', () => {
    let comp: ProductSetDetailPriceDetailComponent;
    let fixture: ComponentFixture<ProductSetDetailPriceDetailComponent>;
    const route = ({ data: of({ productSetDetailPrice: new ProductSetDetailPrice(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductSetDetailPriceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductSetDetailPriceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductSetDetailPriceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productSetDetailPrice on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productSetDetailPrice).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
