import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductSetComponent } from 'app/entities/zezawar/product-set/product-set.component';
import { ProductSetService } from 'app/entities/zezawar/product-set/product-set.service';
import { ProductSet } from 'app/shared/model/zezawar/product-set.model';

describe('Component Tests', () => {
  describe('ProductSet Management Component', () => {
    let comp: ProductSetComponent;
    let fixture: ComponentFixture<ProductSetComponent>;
    let service: ProductSetService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductSetComponent],
      })
        .overrideTemplate(ProductSetComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductSetComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductSetService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductSet(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productSets && comp.productSets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
