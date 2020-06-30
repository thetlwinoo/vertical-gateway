import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DiscountDetailsUpdateComponent } from 'app/entities/zezawar/discount-details/discount-details-update.component';
import { DiscountDetailsService } from 'app/entities/zezawar/discount-details/discount-details.service';
import { DiscountDetails } from 'app/shared/model/zezawar/discount-details.model';

describe('Component Tests', () => {
  describe('DiscountDetails Management Update Component', () => {
    let comp: DiscountDetailsUpdateComponent;
    let fixture: ComponentFixture<DiscountDetailsUpdateComponent>;
    let service: DiscountDetailsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiscountDetailsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiscountDetailsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiscountDetailsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiscountDetailsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DiscountDetails(123);
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
        const entity = new DiscountDetails();
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
