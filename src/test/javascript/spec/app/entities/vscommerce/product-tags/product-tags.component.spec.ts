import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductTagsComponent } from 'app/entities/vscommerce/product-tags/product-tags.component';
import { ProductTagsService } from 'app/entities/vscommerce/product-tags/product-tags.service';
import { ProductTags } from 'app/shared/model/vscommerce/product-tags.model';

describe('Component Tests', () => {
  describe('ProductTags Management Component', () => {
    let comp: ProductTagsComponent;
    let fixture: ComponentFixture<ProductTagsComponent>;
    let service: ProductTagsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductTagsComponent],
      })
        .overrideTemplate(ProductTagsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductTagsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductTagsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductTags(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productTags && comp.productTags[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
