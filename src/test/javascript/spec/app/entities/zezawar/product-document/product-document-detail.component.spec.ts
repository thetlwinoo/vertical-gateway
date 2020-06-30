import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ProductDocumentDetailComponent } from 'app/entities/zezawar/product-document/product-document-detail.component';
import { ProductDocument } from 'app/shared/model/zezawar/product-document.model';

describe('Component Tests', () => {
  describe('ProductDocument Management Detail Component', () => {
    let comp: ProductDocumentDetailComponent;
    let fixture: ComponentFixture<ProductDocumentDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ productDocument: new ProductDocument(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductDocumentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProductDocumentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductDocumentDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load productDocument on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productDocument).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
