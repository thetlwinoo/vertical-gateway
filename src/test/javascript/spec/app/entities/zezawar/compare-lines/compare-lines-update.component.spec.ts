import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CompareLinesUpdateComponent } from 'app/entities/zezawar/compare-lines/compare-lines-update.component';
import { CompareLinesService } from 'app/entities/zezawar/compare-lines/compare-lines.service';
import { CompareLines } from 'app/shared/model/zezawar/compare-lines.model';

describe('Component Tests', () => {
  describe('CompareLines Management Update Component', () => {
    let comp: CompareLinesUpdateComponent;
    let fixture: ComponentFixture<CompareLinesUpdateComponent>;
    let service: CompareLinesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CompareLinesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CompareLinesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CompareLinesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CompareLinesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CompareLines(123);
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
        const entity = new CompareLines();
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
