import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ReviewLinesDetailComponent } from 'app/entities/vscommerce/review-lines/review-lines-detail.component';
import { ReviewLines } from 'app/shared/model/vscommerce/review-lines.model';

describe('Component Tests', () => {
  describe('ReviewLines Management Detail Component', () => {
    let comp: ReviewLinesDetailComponent;
    let fixture: ComponentFixture<ReviewLinesDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ reviewLines: new ReviewLines(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ReviewLinesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ReviewLinesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReviewLinesDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load reviewLines on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reviewLines).toEqual(jasmine.objectContaining({ id: 123 }));
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
