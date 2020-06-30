import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { InvoicesUpdateComponent } from 'app/entities/vscommerce/invoices/invoices-update.component';
import { InvoicesService } from 'app/entities/vscommerce/invoices/invoices.service';
import { Invoices } from 'app/shared/model/vscommerce/invoices.model';

describe('Component Tests', () => {
  describe('Invoices Management Update Component', () => {
    let comp: InvoicesUpdateComponent;
    let fixture: ComponentFixture<InvoicesUpdateComponent>;
    let service: InvoicesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [InvoicesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(InvoicesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InvoicesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvoicesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Invoices(123);
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
        const entity = new Invoices();
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
