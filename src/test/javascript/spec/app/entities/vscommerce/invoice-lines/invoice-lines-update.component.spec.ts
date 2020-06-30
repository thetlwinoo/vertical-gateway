import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { InvoiceLinesUpdateComponent } from 'app/entities/vscommerce/invoice-lines/invoice-lines-update.component';
import { InvoiceLinesService } from 'app/entities/vscommerce/invoice-lines/invoice-lines.service';
import { InvoiceLines } from 'app/shared/model/vscommerce/invoice-lines.model';

describe('Component Tests', () => {
  describe('InvoiceLines Management Update Component', () => {
    let comp: InvoiceLinesUpdateComponent;
    let fixture: ComponentFixture<InvoiceLinesUpdateComponent>;
    let service: InvoiceLinesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [InvoiceLinesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(InvoiceLinesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InvoiceLinesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvoiceLinesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new InvoiceLines(123);
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
        const entity = new InvoiceLines();
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
