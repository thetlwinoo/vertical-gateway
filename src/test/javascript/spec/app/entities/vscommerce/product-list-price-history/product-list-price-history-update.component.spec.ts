import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductListPriceHistoryUpdateComponent } from 'app/entities/vscommerce/product-list-price-history/product-list-price-history-update.component';
import { ProductListPriceHistoryService } from 'app/entities/vscommerce/product-list-price-history/product-list-price-history.service';
import { ProductListPriceHistory } from 'app/shared/model/vscommerce/product-list-price-history.model';

describe('Component Tests', () => {
  describe('ProductListPriceHistory Management Update Component', () => {
    let comp: ProductListPriceHistoryUpdateComponent;
    let fixture: ComponentFixture<ProductListPriceHistoryUpdateComponent>;
    let service: ProductListPriceHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductListPriceHistoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProductListPriceHistoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductListPriceHistoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductListPriceHistoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductListPriceHistory(123);
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
        const entity = new ProductListPriceHistory();
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
