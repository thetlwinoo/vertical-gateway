import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ProductChoiceComponent } from 'app/entities/vscommerce/product-choice/product-choice.component';
import { ProductChoiceService } from 'app/entities/vscommerce/product-choice/product-choice.service';
import { ProductChoice } from 'app/shared/model/vscommerce/product-choice.model';

describe('Component Tests', () => {
  describe('ProductChoice Management Component', () => {
    let comp: ProductChoiceComponent;
    let fixture: ComponentFixture<ProductChoiceComponent>;
    let service: ProductChoiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductChoiceComponent],
      })
        .overrideTemplate(ProductChoiceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductChoiceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductChoiceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductChoice(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productChoices && comp.productChoices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
