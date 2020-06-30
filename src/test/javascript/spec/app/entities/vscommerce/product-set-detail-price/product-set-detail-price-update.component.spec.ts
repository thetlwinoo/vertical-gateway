import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductSetDetailPriceUpdateComponent } from 'app/entities/vscommerce/product-set-detail-price/product-set-detail-price-update.component';
import { ProductSetDetailPriceService } from 'app/entities/vscommerce/product-set-detail-price/product-set-detail-price.service';
import { ProductSetDetailPrice } from 'app/shared/model/vscommerce/product-set-detail-price.model';

describe('Component Tests', () => {
  describe('ProductSetDetailPrice Management Update Component', () => {
    let comp: ProductSetDetailPriceUpdateComponent;
    let fixture: ComponentFixture<ProductSetDetailPriceUpdateComponent>;
    let service: ProductSetDetailPriceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductSetDetailPriceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProductSetDetailPriceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductSetDetailPriceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductSetDetailPriceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductSetDetailPrice(123);
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
        const entity = new ProductSetDetailPrice();
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
