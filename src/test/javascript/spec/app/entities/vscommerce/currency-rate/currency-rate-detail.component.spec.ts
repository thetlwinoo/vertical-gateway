import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CurrencyRateDetailComponent } from 'app/entities/vscommerce/currency-rate/currency-rate-detail.component';
import { CurrencyRate } from 'app/shared/model/vscommerce/currency-rate.model';

describe('Component Tests', () => {
  describe('CurrencyRate Management Detail Component', () => {
    let comp: CurrencyRateDetailComponent;
    let fixture: ComponentFixture<CurrencyRateDetailComponent>;
    const route = ({ data: of({ currencyRate: new CurrencyRate(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CurrencyRateDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CurrencyRateDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CurrencyRateDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load currencyRate on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.currencyRate).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
