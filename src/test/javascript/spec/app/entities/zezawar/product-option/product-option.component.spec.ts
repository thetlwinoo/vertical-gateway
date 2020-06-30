import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductOptionComponent } from 'app/entities/zezawar/product-option/product-option.component';
import { ProductOptionService } from 'app/entities/zezawar/product-option/product-option.service';
import { ProductOption } from 'app/shared/model/zezawar/product-option.model';

describe('Component Tests', () => {
  describe('ProductOption Management Component', () => {
    let comp: ProductOptionComponent;
    let fixture: ComponentFixture<ProductOptionComponent>;
    let service: ProductOptionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductOptionComponent],
      })
        .overrideTemplate(ProductOptionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductOptionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductOptionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductOption(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productOptions && comp.productOptions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
