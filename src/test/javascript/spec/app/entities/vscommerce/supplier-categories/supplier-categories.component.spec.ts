import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { SupplierCategoriesComponent } from 'app/entities/vscommerce/supplier-categories/supplier-categories.component';
import { SupplierCategoriesService } from 'app/entities/vscommerce/supplier-categories/supplier-categories.service';
import { SupplierCategories } from 'app/shared/model/vscommerce/supplier-categories.model';

describe('Component Tests', () => {
  describe('SupplierCategories Management Component', () => {
    let comp: SupplierCategoriesComponent;
    let fixture: ComponentFixture<SupplierCategoriesComponent>;
    let service: SupplierCategoriesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SupplierCategoriesComponent],
      })
        .overrideTemplate(SupplierCategoriesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupplierCategoriesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupplierCategoriesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SupplierCategories(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.supplierCategories && comp.supplierCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
