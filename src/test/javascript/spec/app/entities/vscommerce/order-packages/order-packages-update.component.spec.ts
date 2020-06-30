import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { OrderPackagesUpdateComponent } from 'app/entities/vscommerce/order-packages/order-packages-update.component';
import { OrderPackagesService } from 'app/entities/vscommerce/order-packages/order-packages.service';
import { OrderPackages } from 'app/shared/model/vscommerce/order-packages.model';

describe('Component Tests', () => {
  describe('OrderPackages Management Update Component', () => {
    let comp: OrderPackagesUpdateComponent;
    let fixture: ComponentFixture<OrderPackagesUpdateComponent>;
    let service: OrderPackagesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OrderPackagesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OrderPackagesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrderPackagesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrderPackagesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrderPackages(123);
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
        const entity = new OrderPackages();
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
