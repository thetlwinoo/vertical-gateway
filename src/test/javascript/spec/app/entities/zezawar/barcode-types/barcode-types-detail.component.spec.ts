import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { BarcodeTypesDetailComponent } from 'app/entities/zezawar/barcode-types/barcode-types-detail.component';
import { BarcodeTypes } from 'app/shared/model/zezawar/barcode-types.model';

describe('Component Tests', () => {
  describe('BarcodeTypes Management Detail Component', () => {
    let comp: BarcodeTypesDetailComponent;
    let fixture: ComponentFixture<BarcodeTypesDetailComponent>;
    const route = ({ data: of({ barcodeTypes: new BarcodeTypes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BarcodeTypesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BarcodeTypesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BarcodeTypesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load barcodeTypes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.barcodeTypes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
