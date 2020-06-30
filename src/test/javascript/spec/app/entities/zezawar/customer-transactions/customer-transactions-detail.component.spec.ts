import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CustomerTransactionsDetailComponent } from 'app/entities/zezawar/customer-transactions/customer-transactions-detail.component';
import { CustomerTransactions } from 'app/shared/model/zezawar/customer-transactions.model';

describe('Component Tests', () => {
  describe('CustomerTransactions Management Detail Component', () => {
    let comp: CustomerTransactionsDetailComponent;
    let fixture: ComponentFixture<CustomerTransactionsDetailComponent>;
    const route = ({ data: of({ customerTransactions: new CustomerTransactions(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomerTransactionsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CustomerTransactionsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CustomerTransactionsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load customerTransactions on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.customerTransactions).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
