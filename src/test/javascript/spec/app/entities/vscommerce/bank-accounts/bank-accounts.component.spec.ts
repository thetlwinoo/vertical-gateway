import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { BankAccountsComponent } from 'app/entities/vscommerce/bank-accounts/bank-accounts.component';
import { BankAccountsService } from 'app/entities/vscommerce/bank-accounts/bank-accounts.service';
import { BankAccounts } from 'app/shared/model/vscommerce/bank-accounts.model';

describe('Component Tests', () => {
  describe('BankAccounts Management Component', () => {
    let comp: BankAccountsComponent;
    let fixture: ComponentFixture<BankAccountsComponent>;
    let service: BankAccountsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BankAccountsComponent],
      })
        .overrideTemplate(BankAccountsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BankAccountsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BankAccountsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BankAccounts(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bankAccounts && comp.bankAccounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
