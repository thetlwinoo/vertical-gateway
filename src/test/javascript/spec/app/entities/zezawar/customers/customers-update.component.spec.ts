import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomersUpdateComponent } from 'app/entities/zezawar/customers/customers-update.component';
import { CustomersService } from 'app/entities/zezawar/customers/customers.service';
import { Customers } from 'app/shared/model/zezawar/customers.model';

describe('Component Tests', () => {
  describe('Customers Management Update Component', () => {
    let comp: CustomersUpdateComponent;
    let fixture: ComponentFixture<CustomersUpdateComponent>;
    let service: CustomersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomersUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CustomersUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomersUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomersService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Customers(123);
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
        const entity = new Customers();
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
