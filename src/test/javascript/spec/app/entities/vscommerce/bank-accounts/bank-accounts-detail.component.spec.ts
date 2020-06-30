import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { BankAccountsDetailComponent } from 'app/entities/vscommerce/bank-accounts/bank-accounts-detail.component';
import { BankAccounts } from 'app/shared/model/vscommerce/bank-accounts.model';

describe('Component Tests', () => {
  describe('BankAccounts Management Detail Component', () => {
    let comp: BankAccountsDetailComponent;
    let fixture: ComponentFixture<BankAccountsDetailComponent>;
    const route = ({ data: of({ bankAccounts: new BankAccounts(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BankAccountsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BankAccountsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BankAccountsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load bankAccounts on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bankAccounts).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
