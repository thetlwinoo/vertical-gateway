import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerCategoriesDetailComponent } from 'app/entities/zezawar/customer-categories/customer-categories-detail.component';
import { CustomerCategories } from 'app/shared/model/zezawar/customer-categories.model';

describe('Component Tests', () => {
  describe('CustomerCategories Management Detail Component', () => {
    let comp: CustomerCategoriesDetailComponent;
    let fixture: ComponentFixture<CustomerCategoriesDetailComponent>;
    const route = ({ data: of({ customerCategories: new CustomerCategories(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerCategoriesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerCategoriesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerCategoriesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customerCategories on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerCategories).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
