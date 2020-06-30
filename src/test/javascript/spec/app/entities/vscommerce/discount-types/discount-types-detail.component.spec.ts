import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DiscountTypesDetailComponent } from 'app/entities/vscommerce/discount-types/discount-types-detail.component';
import { DiscountTypes } from 'app/shared/model/vscommerce/discount-types.model';

describe('Component Tests', () => {
  describe('DiscountTypes Management Detail Component', () => {
    let comp: DiscountTypesDetailComponent;
    let fixture: ComponentFixture<DiscountTypesDetailComponent>;
    const route = ({ data: of({ discountTypes: new DiscountTypes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiscountTypesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiscountTypesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiscountTypesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load discountTypes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.discountTypes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
