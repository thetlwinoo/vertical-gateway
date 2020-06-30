import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { QuestionsUpdateComponent } from 'app/entities/vscommerce/questions/questions-update.component';
import { QuestionsService } from 'app/entities/vscommerce/questions/questions.service';
import { Questions } from 'app/shared/model/vscommerce/questions.model';

describe('Component Tests', () => {
  describe('Questions Management Update Component', () => {
    let comp: QuestionsUpdateComponent;
    let fixture: ComponentFixture<QuestionsUpdateComponent>;
    let service: QuestionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [QuestionsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(QuestionsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuestionsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuestionsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Questions(123);
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
        const entity = new Questions();
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
