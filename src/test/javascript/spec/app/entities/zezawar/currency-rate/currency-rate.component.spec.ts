import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CurrencyRateComponent } from 'app/entities/zezawar/currency-rate/currency-rate.component';
import { CurrencyRateService } from 'app/entities/zezawar/currency-rate/currency-rate.service';
import { CurrencyRate } from 'app/shared/model/zezawar/currency-rate.model';

describe('Component Tests', () => {
  describe('CurrencyRate Management Component', () => {
    let comp: CurrencyRateComponent;
    let fixture: ComponentFixture<CurrencyRateComponent>;
    let service: CurrencyRateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CurrencyRateComponent],
      })
        .overrideTemplate(CurrencyRateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CurrencyRateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CurrencyRateService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CurrencyRate(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.currencyRates && comp.currencyRates[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
