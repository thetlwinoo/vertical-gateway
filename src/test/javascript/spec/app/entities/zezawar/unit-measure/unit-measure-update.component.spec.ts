import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { UnitMeasureUpdateComponent } from 'app/entities/zezawar/unit-measure/unit-measure-update.component';
import { UnitMeasureService } from 'app/entities/zezawar/unit-measure/unit-measure.service';
import { UnitMeasure } from 'app/shared/model/zezawar/unit-measure.model';

describe('Component Tests', () => {
  describe('UnitMeasure Management Update Component', () => {
    let comp: UnitMeasureUpdateComponent;
    let fixture: ComponentFixture<UnitMeasureUpdateComponent>;
    let service: UnitMeasureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UnitMeasureUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(UnitMeasureUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UnitMeasureUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UnitMeasureService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UnitMeasure(123);
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
        const entity = new UnitMeasure();
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
