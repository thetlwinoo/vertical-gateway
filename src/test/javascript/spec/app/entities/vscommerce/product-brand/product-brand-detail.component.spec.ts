import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductBrandDetailComponent } from 'app/entities/vscommerce/product-brand/product-brand-detail.component';
import { ProductBrand } from 'app/shared/model/vscommerce/product-brand.model';

describe('Component Tests', () => {
  describe('ProductBrand Management Detail Component', () => {
    let comp: ProductBrandDetailComponent;
    let fixture: ComponentFixture<ProductBrandDetailComponent>;
    const route = ({ data: of({ productBrand: new ProductBrand(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductBrandDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductBrandDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductBrandDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productBrand on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productBrand).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
