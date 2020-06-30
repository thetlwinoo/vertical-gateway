import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { WarrantyTypesComponent } from 'app/entities/vscommerce/warranty-types/warranty-types.component';
import { WarrantyTypesService } from 'app/entities/vscommerce/warranty-types/warranty-types.service';
import { WarrantyTypes } from 'app/shared/model/vscommerce/warranty-types.model';

describe('Component Tests', () => {
  describe('WarrantyTypes Management Component', () => {
    let comp: WarrantyTypesComponent;
    let fixture: ComponentFixture<WarrantyTypesComponent>;
    let service: WarrantyTypesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [WarrantyTypesComponent],
      })
        .overrideTemplate(WarrantyTypesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WarrantyTypesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WarrantyTypesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new WarrantyTypes(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.warrantyTypes && comp.warrantyTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
