import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CreditCardTypeDetailComponent } from 'app/entities/zezawar/credit-card-type/credit-card-type-detail.component';
import { CreditCardType } from 'app/shared/model/zezawar/credit-card-type.model';

describe('Component Tests', () => {
  describe('CreditCardType Management Detail Component', () => {
    let comp: CreditCardTypeDetailComponent;
    let fixture: ComponentFixture<CreditCardTypeDetailComponent>;
    const route = ({ data: of({ creditCardType: new CreditCardType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CreditCardTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CreditCardTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CreditCardTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load creditCardType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.creditCardType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
