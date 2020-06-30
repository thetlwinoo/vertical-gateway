import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TransactionTypesDetailComponent } from 'app/entities/vscommerce/transaction-types/transaction-types-detail.component';
import { TransactionTypes } from 'app/shared/model/vscommerce/transaction-types.model';

describe('Component Tests', () => {
  describe('TransactionTypes Management Detail Component', () => {
    let comp: TransactionTypesDetailComponent;
    let fixture: ComponentFixture<TransactionTypesDetailComponent>;
    const route = ({ data: of({ transactionTypes: new TransactionTypes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TransactionTypesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TransactionTypesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TransactionTypesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load transactionTypes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transactionTypes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
