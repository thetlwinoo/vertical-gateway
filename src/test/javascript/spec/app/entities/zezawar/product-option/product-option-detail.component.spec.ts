import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductOptionDetailComponent } from 'app/entities/zezawar/product-option/product-option-detail.component';
import { ProductOption } from 'app/shared/model/zezawar/product-option.model';

describe('Component Tests', () => {
  describe('ProductOption Management Detail Component', () => {
    let comp: ProductOptionDetailComponent;
    let fixture: ComponentFixture<ProductOptionDetailComponent>;
    const route = ({ data: of({ productOption: new ProductOption(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductOptionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductOptionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductOptionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productOption on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productOption).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
