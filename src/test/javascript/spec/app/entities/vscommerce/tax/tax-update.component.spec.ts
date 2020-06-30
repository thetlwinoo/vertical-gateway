import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TaxUpdateComponent } from 'app/entities/vscommerce/tax/tax-update.component';
import { TaxService } from 'app/entities/vscommerce/tax/tax.service';
import { Tax } from 'app/shared/model/vscommerce/tax.model';

describe('Component Tests', () => {
  describe('Tax Management Update Component', () => {
    let comp: TaxUpdateComponent;
    let fixture: ComponentFixture<TaxUpdateComponent>;
    let service: TaxService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TaxUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TaxUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaxUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaxService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tax(123);
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
        const entity = new Tax();
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
