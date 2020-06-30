import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { LogisticsUpdateComponent } from 'app/entities/vscommerce/logistics/logistics-update.component';
import { LogisticsService } from 'app/entities/vscommerce/logistics/logistics.service';
import { Logistics } from 'app/shared/model/vscommerce/logistics.model';

describe('Component Tests', () => {
  describe('Logistics Management Update Component', () => {
    let comp: LogisticsUpdateComponent;
    let fixture: ComponentFixture<LogisticsUpdateComponent>;
    let service: LogisticsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LogisticsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LogisticsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LogisticsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LogisticsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Logistics(123);
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
        const entity = new Logistics();
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
