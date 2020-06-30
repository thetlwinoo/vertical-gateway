import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CreditCardTypeUpdateComponent } from 'app/entities/zezawar/credit-card-type/credit-card-type-update.component';
import { CreditCardTypeService } from 'app/entities/zezawar/credit-card-type/credit-card-type.service';
import { CreditCardType } from 'app/shared/model/zezawar/credit-card-type.model';

describe('Component Tests', () => {
  describe('CreditCardType Management Update Component', () => {
    let comp: CreditCardTypeUpdateComponent;
    let fixture: ComponentFixture<CreditCardTypeUpdateComponent>;
    let service: CreditCardTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CreditCardTypeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CreditCardTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CreditCardTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CreditCardTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CreditCardType(123);
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
        const entity = new CreditCardType();
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
