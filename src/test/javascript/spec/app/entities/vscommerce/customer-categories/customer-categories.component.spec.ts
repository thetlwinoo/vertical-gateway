import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerCategoriesComponent } from 'app/entities/vscommerce/customer-categories/customer-categories.component';
import { CustomerCategoriesService } from 'app/entities/vscommerce/customer-categories/customer-categories.service';
import { CustomerCategories } from 'app/shared/model/vscommerce/customer-categories.model';

describe('Component Tests', () => {
  describe('CustomerCategories Management Component', () => {
    let comp: CustomerCategoriesComponent;
    let fixture: ComponentFixture<CustomerCategoriesComponent>;
    let service: CustomerCategoriesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerCategoriesComponent],
      })
        .overrideTemplate(CustomerCategoriesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomerCategoriesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomerCategoriesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CustomerCategories(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customerCategories && comp.customerCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
