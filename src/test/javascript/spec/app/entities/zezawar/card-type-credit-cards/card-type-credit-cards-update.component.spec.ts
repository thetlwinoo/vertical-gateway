import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CardTypeCreditCardsUpdateComponent } from 'app/entities/zezawar/card-type-credit-cards/card-type-credit-cards-update.component';
import { CardTypeCreditCardsService } from 'app/entities/zezawar/card-type-credit-cards/card-type-credit-cards.service';
import { CardTypeCreditCards } from 'app/shared/model/zezawar/card-type-credit-cards.model';

describe('Component Tests', () => {
  describe('CardTypeCreditCards Management Update Component', () => {
    let comp: CardTypeCreditCardsUpdateComponent;
    let fixture: ComponentFixture<CardTypeCreditCardsUpdateComponent>;
    let service: CardTypeCreditCardsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardTypeCreditCardsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CardTypeCreditCardsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CardTypeCreditCardsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CardTypeCreditCardsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CardTypeCreditCards(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new CardTypeCreditCards();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
