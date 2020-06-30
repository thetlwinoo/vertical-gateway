import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PhoneNumberTypeComponent } from 'app/entities/zezawar/phone-number-type/phone-number-type.component';
import { PhoneNumberTypeService } from 'app/entities/zezawar/phone-number-type/phone-number-type.service';
import { PhoneNumberType } from 'app/shared/model/zezawar/phone-number-type.model';

describe('Component Tests', () => {
  describe('PhoneNumberType Management Component', () => {
    let comp: PhoneNumberTypeComponent;
    let fixture: ComponentFixture<PhoneNumberTypeComponent>;
    let service: PhoneNumberTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PhoneNumberTypeComponent],
      })
        .overrideTemplate(PhoneNumberTypeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PhoneNumberTypeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PhoneNumberTypeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PhoneNumberType(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.phoneNumberTypes && comp.phoneNumberTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
