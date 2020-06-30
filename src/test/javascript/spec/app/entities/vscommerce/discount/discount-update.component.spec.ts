import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DiscountUpdateComponent } from 'app/entities/vscommerce/discount/discount-update.component';
import { DiscountService } from 'app/entities/vscommerce/discount/discount.service';
import { Discount } from 'app/shared/model/vscommerce/discount.model';

describe('Component Tests', () => {
  describe('Discount Management Update Component', () => {
    let comp: DiscountUpdateComponent;
    let fixture: ComponentFixture<DiscountUpdateComponent>;
    let service: DiscountService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiscountUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiscountUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiscountUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiscountService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Discount(123);
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
        const entity = new Discount();
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
