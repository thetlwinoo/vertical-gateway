import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CitiesDetailComponent } from 'app/entities/zezawar/cities/cities-detail.component';
import { Cities } from 'app/shared/model/zezawar/cities.model';

describe('Component Tests', () => {
  describe('Cities Management Detail Component', () => {
    let comp: CitiesDetailComponent;
    let fixture: ComponentFixture<CitiesDetailComponent>;
    const route = ({ data: of({ cities: new Cities(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CitiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CitiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CitiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cities on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cities).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
