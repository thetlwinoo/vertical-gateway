import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductAttributeSetDetailComponent } from 'app/entities/vscommerce/product-attribute-set/product-attribute-set-detail.component';
import { ProductAttributeSet } from 'app/shared/model/vscommerce/product-attribute-set.model';

describe('Component Tests', () => {
  describe('ProductAttributeSet Management Detail Component', () => {
    let comp: ProductAttributeSetDetailComponent;
    let fixture: ComponentFixture<ProductAttributeSetDetailComponent>;
    const route = ({ data: of({ productAttributeSet: new ProductAttributeSet(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductAttributeSetDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductAttributeSetDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductAttributeSetDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productAttributeSet on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productAttributeSet).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
