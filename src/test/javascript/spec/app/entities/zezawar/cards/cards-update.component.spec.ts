import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CardsUpdateComponent } from 'app/entities/zezawar/cards/cards-update.component';
import { CardsService } from 'app/entities/zezawar/cards/cards.service';
import { Cards } from 'app/shared/model/zezawar/cards.model';

describe('Component Tests', () => {
  describe('Cards Management Update Component', () => {
    let comp: CardsUpdateComponent;
    let fixture: ComponentFixture<CardsUpdateComponent>;
    let service: CardsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CardsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CardsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CardsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cards(123);
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
        const entity = new Cards();
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
