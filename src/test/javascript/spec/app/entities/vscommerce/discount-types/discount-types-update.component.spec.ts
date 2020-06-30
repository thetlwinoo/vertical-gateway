import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DiscountTypesUpdateComponent } from 'app/entities/vscommerce/discount-types/discount-types-update.component';
import { DiscountTypesService } from 'app/entities/vscommerce/discount-types/discount-types.service';
import { DiscountTypes } from 'app/shared/model/vscommerce/discount-types.model';

describe('Component Tests', () => {
  describe('DiscountTypes Management Update Component', () => {
    let comp: DiscountTypesUpdateComponent;
    let fixture: ComponentFixture<DiscountTypesUpdateComponent>;
    let service: DiscountTypesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiscountTypesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiscountTypesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiscountTypesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiscountTypesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DiscountTypes(123);
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
        const entity = new DiscountTypes();
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
