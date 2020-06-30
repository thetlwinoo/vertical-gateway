import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PhoneNumberTypeDetailComponent } from 'app/entities/zezawar/phone-number-type/phone-number-type-detail.component';
import { PhoneNumberType } from 'app/shared/model/zezawar/phone-number-type.model';

describe('Component Tests', () => {
  describe('PhoneNumberType Management Detail Component', () => {
    let comp: PhoneNumberTypeDetailComponent;
    let fixture: ComponentFixture<PhoneNumberTypeDetailComponent>;
    const route = ({ data: of({ phoneNumberType: new PhoneNumberType(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PhoneNumberTypeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PhoneNumberTypeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PhoneNumberTypeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load phoneNumberType on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.phoneNumberType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
