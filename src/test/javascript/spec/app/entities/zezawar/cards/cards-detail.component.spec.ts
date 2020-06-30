import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CardsDetailComponent } from 'app/entities/zezawar/cards/cards-detail.component';
import { Cards } from 'app/shared/model/zezawar/cards.model';

describe('Component Tests', () => {
  describe('Cards Management Detail Component', () => {
    let comp: CardsDetailComponent;
    let fixture: ComponentFixture<CardsDetailComponent>;
    const route = ({ data: of({ cards: new Cards(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CardsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CardsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cards on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cards).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
