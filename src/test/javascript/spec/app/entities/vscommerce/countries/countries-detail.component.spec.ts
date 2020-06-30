import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CountriesDetailComponent } from 'app/entities/vscommerce/countries/countries-detail.component';
import { Countries } from 'app/shared/model/vscommerce/countries.model';

describe('Component Tests', () => {
  describe('Countries Management Detail Component', () => {
    let comp: CountriesDetailComponent;
    let fixture: ComponentFixture<CountriesDetailComponent>;
    const route = ({ data: of({ countries: new Countries(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CountriesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CountriesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CountriesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load countries on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.countries).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
