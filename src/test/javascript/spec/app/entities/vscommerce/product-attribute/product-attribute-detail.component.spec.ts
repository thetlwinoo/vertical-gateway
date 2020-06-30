import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductAttributeDetailComponent } from 'app/entities/vscommerce/product-attribute/product-attribute-detail.component';
import { ProductAttribute } from 'app/shared/model/vscommerce/product-attribute.model';

describe('Component Tests', () => {
  describe('ProductAttribute Management Detail Component', () => {
    let comp: ProductAttributeDetailComponent;
    let fixture: ComponentFixture<ProductAttributeDetailComponent>;
    const route = ({ data: of({ productAttribute: new ProductAttribute(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductAttributeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductAttributeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductAttributeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productAttribute on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productAttribute).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
