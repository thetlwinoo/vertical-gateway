import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SupplierCategoriesDetailComponent } from 'app/entities/vscommerce/supplier-categories/supplier-categories-detail.component';
import { SupplierCategories } from 'app/shared/model/vscommerce/supplier-categories.model';

describe('Component Tests', () => {
  describe('SupplierCategories Management Detail Component', () => {
    let comp: SupplierCategoriesDetailComponent;
    let fixture: ComponentFixture<SupplierCategoriesDetailComponent>;
    const route = ({ data: of({ supplierCategories: new SupplierCategories(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SupplierCategoriesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SupplierCategoriesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SupplierCategoriesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load supplierCategories on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.supplierCategories).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
