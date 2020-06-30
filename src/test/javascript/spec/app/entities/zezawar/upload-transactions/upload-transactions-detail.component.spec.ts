import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { UploadTransactionsDetailComponent } from 'app/entities/zezawar/upload-transactions/upload-transactions-detail.component';
import { UploadTransactions } from 'app/shared/model/zezawar/upload-transactions.model';

describe('Component Tests', () => {
  describe('UploadTransactions Management Detail Component', () => {
    let comp: UploadTransactionsDetailComponent;
    let fixture: ComponentFixture<UploadTransactionsDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ uploadTransactions: new UploadTransactions(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UploadTransactionsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UploadTransactionsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UploadTransactionsDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load uploadTransactions on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.uploadTransactions).toEqual(jasmine.objectContaining({ id: 123 }));
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
