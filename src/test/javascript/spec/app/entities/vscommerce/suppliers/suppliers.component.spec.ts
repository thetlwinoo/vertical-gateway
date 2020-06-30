import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { SuppliersComponent } from 'app/entities/vscommerce/suppliers/suppliers.component';
import { SuppliersService } from 'app/entities/vscommerce/suppliers/suppliers.service';
import { Suppliers } from 'app/shared/model/vscommerce/suppliers.model';

describe('Component Tests', () => {
  describe('Suppliers Management Component', () => {
    let comp: SuppliersComponent;
    let fixture: ComponentFixture<SuppliersComponent>;
    let service: SuppliersService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SuppliersComponent],
      })
        .overrideTemplate(SuppliersComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SuppliersComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SuppliersService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Suppliers(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.suppliers && comp.suppliers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
