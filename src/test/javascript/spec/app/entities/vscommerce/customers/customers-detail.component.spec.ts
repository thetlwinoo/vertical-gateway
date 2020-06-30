import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomersDetailComponent } from 'app/entities/vscommerce/customers/customers-detail.component';
import { Customers } from 'app/shared/model/vscommerce/customers.model';

describe('Component Tests', () => {
  describe('Customers Management Detail Component', () => {
    let comp: CustomersDetailComponent;
    let fixture: ComponentFixture<CustomersDetailComponent>;
    const route = ({ data: of({ customers: new Customers(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customers on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customers).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
