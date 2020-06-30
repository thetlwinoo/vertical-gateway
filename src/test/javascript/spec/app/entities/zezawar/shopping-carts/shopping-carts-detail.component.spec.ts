import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ShoppingCartsDetailComponent } from 'app/entities/zezawar/shopping-carts/shopping-carts-detail.component';
import { ShoppingCarts } from 'app/shared/model/zezawar/shopping-carts.model';

describe('Component Tests', () => {
  describe('ShoppingCarts Management Detail Component', () => {
    let comp: ShoppingCartsDetailComponent;
    let fixture: ComponentFixture<ShoppingCartsDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ shoppingCarts: new ShoppingCarts(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ShoppingCartsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ShoppingCartsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShoppingCartsDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load shoppingCarts on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shoppingCarts).toEqual(jasmine.objectContaining({ id: 123 }));
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
