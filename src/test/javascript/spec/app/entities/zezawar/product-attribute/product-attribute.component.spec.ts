import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductAttributeComponent } from 'app/entities/zezawar/product-attribute/product-attribute.component';
import { ProductAttributeService } from 'app/entities/zezawar/product-attribute/product-attribute.service';
import { ProductAttribute } from 'app/shared/model/zezawar/product-attribute.model';

describe('Component Tests', () => {
  describe('ProductAttribute Management Component', () => {
    let comp: ProductAttributeComponent;
    let fixture: ComponentFixture<ProductAttributeComponent>;
    let service: ProductAttributeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductAttributeComponent],
      })
        .overrideTemplate(ProductAttributeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductAttributeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductAttributeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductAttribute(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productAttributes && comp.productAttributes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
