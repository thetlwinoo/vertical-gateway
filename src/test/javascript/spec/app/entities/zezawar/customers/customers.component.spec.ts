import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CustomersComponent } from 'app/entities/zezawar/customers/customers.component';
import { CustomersService } from 'app/entities/zezawar/customers/customers.service';
import { Customers } from 'app/shared/model/zezawar/customers.model';

describe('Component Tests', () => {
  describe('Customers Management Component', () => {
    let comp: CustomersComponent;
    let fixture: ComponentFixture<CustomersComponent>;
    let service: CustomersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CustomersComponent],
      })
        .overrideTemplate(CustomersComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CustomersComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CustomersService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Customers(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.customers && comp.customers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
