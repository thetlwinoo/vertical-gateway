import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SupplierTransactionStatusDetailComponent } from 'app/entities/vscommerce/supplier-transaction-status/supplier-transaction-status-detail.component';
import { SupplierTransactionStatus } from 'app/shared/model/vscommerce/supplier-transaction-status.model';

describe('Component Tests', () => {
  describe('SupplierTransactionStatus Management Detail Component', () => {
    let comp: SupplierTransactionStatusDetailComponent;
    let fixture: ComponentFixture<SupplierTransactionStatusDetailComponent>;
    const route = ({ data: of({ supplierTransactionStatus: new SupplierTransactionStatus(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SupplierTransactionStatusDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SupplierTransactionStatusDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SupplierTransactionStatusDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load supplierTransactionStatus on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.supplierTransactionStatus).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
