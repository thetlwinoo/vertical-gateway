import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { BusinessEntityContactComponent } from 'app/entities/vscommerce/business-entity-contact/business-entity-contact.component';
import { BusinessEntityContactService } from 'app/entities/vscommerce/business-entity-contact/business-entity-contact.service';
import { BusinessEntityContact } from 'app/shared/model/vscommerce/business-entity-contact.model';

describe('Component Tests', () => {
  describe('BusinessEntityContact Management Component', () => {
    let comp: BusinessEntityContactComponent;
    let fixture: ComponentFixture<BusinessEntityContactComponent>;
    let service: BusinessEntityContactService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BusinessEntityContactComponent],
      })
        .overrideTemplate(BusinessEntityContactComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BusinessEntityContactComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BusinessEntityContactService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BusinessEntityContact(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.businessEntityContacts && comp.businessEntityContacts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
