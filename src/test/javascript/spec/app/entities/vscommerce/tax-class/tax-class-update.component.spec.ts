import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TaxClassUpdateComponent } from 'app/entities/vscommerce/tax-class/tax-class-update.component';
import { TaxClassService } from 'app/entities/vscommerce/tax-class/tax-class.service';
import { TaxClass } from 'app/shared/model/vscommerce/tax-class.model';

describe('Component Tests', () => {
  describe('TaxClass Management Update Component', () => {
    let comp: TaxClassUpdateComponent;
    let fixture: ComponentFixture<TaxClassUpdateComponent>;
    let service: TaxClassService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TaxClassUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TaxClassUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaxClassUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TaxClassService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TaxClass(123);
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
        const entity = new TaxClass();
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
