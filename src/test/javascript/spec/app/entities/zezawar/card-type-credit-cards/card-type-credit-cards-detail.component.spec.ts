import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CardTypeCreditCardsDetailComponent } from 'app/entities/zezawar/card-type-credit-cards/card-type-credit-cards-detail.component';
import { CardTypeCreditCards } from 'app/shared/model/zezawar/card-type-credit-cards.model';

describe('Component Tests', () => {
  describe('CardTypeCreditCards Management Detail Component', () => {
    let comp: CardTypeCreditCardsDetailComponent;
    let fixture: ComponentFixture<CardTypeCreditCardsDetailComponent>;
    const route = ({ data: of({ cardTypeCreditCards: new CardTypeCreditCards(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardTypeCreditCardsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CardTypeCreditCardsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CardTypeCreditCardsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cardTypeCreditCards on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cardTypeCreditCards).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
