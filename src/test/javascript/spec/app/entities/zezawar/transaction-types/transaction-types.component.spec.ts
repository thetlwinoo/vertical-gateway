import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { TransactionTypesComponent } from 'app/entities/zezawar/transaction-types/transaction-types.component';
import { TransactionTypesService } from 'app/entities/zezawar/transaction-types/transaction-types.service';
import { TransactionTypes } from 'app/shared/model/zezawar/transaction-types.model';

describe('Component Tests', () => {
  describe('TransactionTypes Management Component', () => {
    let comp: TransactionTypesComponent;
    let fixture: ComponentFixture<TransactionTypesComponent>;
    let service: TransactionTypesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TransactionTypesComponent],
      })
        .overrideTemplate(TransactionTypesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TransactionTypesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TransactionTypesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TransactionTypes(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.transactionTypes && comp.transactionTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
