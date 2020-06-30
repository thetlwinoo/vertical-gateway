import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { UploadActionTypesDetailComponent } from 'app/entities/zezawar/upload-action-types/upload-action-types-detail.component';
import { UploadActionTypes } from 'app/shared/model/zezawar/upload-action-types.model';

describe('Component Tests', () => {
  describe('UploadActionTypes Management Detail Component', () => {
    let comp: UploadActionTypesDetailComponent;
    let fixture: ComponentFixture<UploadActionTypesDetailComponent>;
    const route = ({ data: of({ uploadActionTypes: new UploadActionTypes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UploadActionTypesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UploadActionTypesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UploadActionTypesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load uploadActionTypes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.uploadActionTypes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
