import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { SupplierTransactionsComponent } from 'app/entities/zezawar/supplier-transactions/supplier-transactions.component';
import { SupplierTransactionsService } from 'app/entities/zezawar/supplier-transactions/supplier-transactions.service';
import { SupplierTransactions } from 'app/shared/model/zezawar/supplier-transactions.model';

describe('Component Tests', () => {
  describe('SupplierTransactions Management Component', () => {
    let comp: SupplierTransactionsComponent;
    let fixture: ComponentFixture<SupplierTransactionsComponent>;
    let service: SupplierTransactionsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SupplierTransactionsComponent],
      })
        .overrideTemplate(SupplierTransactionsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SupplierTransactionsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SupplierTransactionsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SupplierTransactions(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.supplierTransactions && comp.supplierTransactions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
