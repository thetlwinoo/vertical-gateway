import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CardTypeCreditCardsComponent } from 'app/entities/vscommerce/card-type-credit-cards/card-type-credit-cards.component';
import { CardTypeCreditCardsService } from 'app/entities/vscommerce/card-type-credit-cards/card-type-credit-cards.service';
import { CardTypeCreditCards } from 'app/shared/model/vscommerce/card-type-credit-cards.model';

describe('Component Tests', () => {
  describe('CardTypeCreditCards Management Component', () => {
    let comp: CardTypeCreditCardsComponent;
    let fixture: ComponentFixture<CardTypeCreditCardsComponent>;
    let service: CardTypeCreditCardsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardTypeCreditCardsComponent],
      })
        .overrideTemplate(CardTypeCreditCardsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CardTypeCreditCardsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CardTypeCreditCardsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CardTypeCreditCards(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cardTypeCreditCards && comp.cardTypeCreditCards[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
