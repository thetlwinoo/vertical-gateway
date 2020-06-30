import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DiscountDetailComponent } from 'app/entities/zezawar/discount/discount-detail.component';
import { Discount } from 'app/shared/model/zezawar/discount.model';

describe('Component Tests', () => {
  describe('Discount Management Detail Component', () => {
    let comp: DiscountDetailComponent;
    let fixture: ComponentFixture<DiscountDetailComponent>;
    const route = ({ data: of({ discount: new Discount(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiscountDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiscountDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiscountDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load discount on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.discount).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
