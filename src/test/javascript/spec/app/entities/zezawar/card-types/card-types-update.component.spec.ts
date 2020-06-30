import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CardTypesUpdateComponent } from 'app/entities/zezawar/card-types/card-types-update.component';
import { CardTypesService } from 'app/entities/zezawar/card-types/card-types.service';
import { CardTypes } from 'app/shared/model/zezawar/card-types.model';

describe('Component Tests', () => {
  describe('CardTypes Management Update Component', () => {
    let comp: CardTypesUpdateComponent;
    let fixture: ComponentFixture<CardTypesUpdateComponent>;
    let service: CardTypesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardTypesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CardTypesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CardTypesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CardTypesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CardTypes(123);
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
        const entity = new CardTypes();
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
