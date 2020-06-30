import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductSetDetailsDetailComponent } from 'app/entities/zezawar/product-set-details/product-set-details-detail.component';
import { ProductSetDetails } from 'app/shared/model/zezawar/product-set-details.model';

describe('Component Tests', () => {
  describe('ProductSetDetails Management Detail Component', () => {
    let comp: ProductSetDetailsDetailComponent;
    let fixture: ComponentFixture<ProductSetDetailsDetailComponent>;
    const route = ({ data: of({ productSetDetails: new ProductSetDetails(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductSetDetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductSetDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductSetDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productSetDetails on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productSetDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
