import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductCatalogDetailComponent } from 'app/entities/vscommerce/product-catalog/product-catalog-detail.component';
import { ProductCatalog } from 'app/shared/model/vscommerce/product-catalog.model';

describe('Component Tests', () => {
  describe('ProductCatalog Management Detail Component', () => {
    let comp: ProductCatalogDetailComponent;
    let fixture: ComponentFixture<ProductCatalogDetailComponent>;
    const route = ({ data: of({ productCatalog: new ProductCatalog(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductCatalogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductCatalogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductCatalogDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productCatalog on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productCatalog).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
