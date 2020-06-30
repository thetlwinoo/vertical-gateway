import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PersonEmailAddressDetailComponent } from 'app/entities/zezawar/person-email-address/person-email-address-detail.component';
import { PersonEmailAddress } from 'app/shared/model/zezawar/person-email-address.model';

describe('Component Tests', () => {
  describe('PersonEmailAddress Management Detail Component', () => {
    let comp: PersonEmailAddressDetailComponent;
    let fixture: ComponentFixture<PersonEmailAddressDetailComponent>;
    const route = ({ data: of({ personEmailAddress: new PersonEmailAddress(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PersonEmailAddressDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PersonEmailAddressDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonEmailAddressDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load personEmailAddress on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.personEmailAddress).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
