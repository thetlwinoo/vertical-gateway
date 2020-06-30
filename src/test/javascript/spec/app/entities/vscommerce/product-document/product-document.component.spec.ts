import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductDocumentComponent } from 'app/entities/vscommerce/product-document/product-document.component';
import { ProductDocumentService } from 'app/entities/vscommerce/product-document/product-document.service';
import { ProductDocument } from 'app/shared/model/vscommerce/product-document.model';

describe('Component Tests', () => {
  describe('ProductDocument Management Component', () => {
    let comp: ProductDocumentComponent;
    let fixture: ComponentFixture<ProductDocumentComponent>;
    let service: ProductDocumentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductDocumentComponent],
      })
        .overrideTemplate(ProductDocumentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductDocumentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductDocumentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductDocument(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productDocuments && comp.productDocuments[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
