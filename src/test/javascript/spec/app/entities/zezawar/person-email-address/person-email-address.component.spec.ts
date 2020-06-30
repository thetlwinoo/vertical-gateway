import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PersonEmailAddressComponent } from 'app/entities/zezawar/person-email-address/person-email-address.component';
import { PersonEmailAddressService } from 'app/entities/zezawar/person-email-address/person-email-address.service';
import { PersonEmailAddress } from 'app/shared/model/zezawar/person-email-address.model';

describe('Component Tests', () => {
  describe('PersonEmailAddress Management Component', () => {
    let comp: PersonEmailAddressComponent;
    let fixture: ComponentFixture<PersonEmailAddressComponent>;
    let service: PersonEmailAddressService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PersonEmailAddressComponent],
      })
        .overrideTemplate(PersonEmailAddressComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonEmailAddressComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonEmailAddressService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PersonEmailAddress(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.personEmailAddresses && comp.personEmailAddresses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
