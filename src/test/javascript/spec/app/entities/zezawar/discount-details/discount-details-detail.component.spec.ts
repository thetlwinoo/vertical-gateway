import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DiscountDetailsDetailComponent } from 'app/entities/zezawar/discount-details/discount-details-detail.component';
import { DiscountDetails } from 'app/shared/model/zezawar/discount-details.model';

describe('Component Tests', () => {
  describe('DiscountDetails Management Detail Component', () => {
    let comp: DiscountDetailsDetailComponent;
    let fixture: ComponentFixture<DiscountDetailsDetailComponent>;
    const route = ({ data: of({ discountDetails: new DiscountDetails(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiscountDetailsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiscountDetailsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiscountDetailsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load discountDetails on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.discountDetails).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
