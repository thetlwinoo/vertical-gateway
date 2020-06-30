import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AddressesUpdateComponent } from 'app/entities/vscommerce/addresses/addresses-update.component';
import { AddressesService } from 'app/entities/vscommerce/addresses/addresses.service';
import { Addresses } from 'app/shared/model/vscommerce/addresses.model';

describe('Component Tests', () => {
  describe('Addresses Management Update Component', () => {
    let comp: AddressesUpdateComponent;
    let fixture: ComponentFixture<AddressesUpdateComponent>;
    let service: AddressesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AddressesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AddressesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AddressesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AddressesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Addresses(123);
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
        const entity = new Addresses();
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
