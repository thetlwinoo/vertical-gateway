import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { SupplierTransactionStatusComponent } from 'app/entities/vscommerce/supplier-transaction-status/supplier-transaction-status.component';
import { SupplierTransactionStatusService } from 'app/entities/vscommerce/supplier-transaction-status/supplier-transaction-status.service';
import { SupplierTransactionStatus } from 'app/shared/model/vscommerce/supplier-transaction-status.model';

describe('Component Tests', () => {
  describe('SupplierTransactionStatus Management Component', () => {
    let comp: SupplierTransactionStatusComponent;
    let fixture: ComponentFixture<SupplierTransactionStatusComponent>;
    let service: SupplierTransactionStatusService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SupplierTransactionStatusComponent],
      })
        .overrideTemplate(SupplierTransactionStatusComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupplierTransactionStatusComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupplierTransactionStatusService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SupplierTransactionStatus(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.supplierTransactionStatuses && comp.supplierTransactionStatuses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
