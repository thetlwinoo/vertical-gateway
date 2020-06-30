import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { BarcodeTypesComponent } from 'app/entities/zezawar/barcode-types/barcode-types.component';
import { BarcodeTypesService } from 'app/entities/zezawar/barcode-types/barcode-types.service';
import { BarcodeTypes } from 'app/shared/model/zezawar/barcode-types.model';

describe('Component Tests', () => {
  describe('BarcodeTypes Management Component', () => {
    let comp: BarcodeTypesComponent;
    let fixture: ComponentFixture<BarcodeTypesComponent>;
    let service: BarcodeTypesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BarcodeTypesComponent],
      })
        .overrideTemplate(BarcodeTypesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BarcodeTypesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BarcodeTypesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BarcodeTypes(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.barcodeTypes && comp.barcodeTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
