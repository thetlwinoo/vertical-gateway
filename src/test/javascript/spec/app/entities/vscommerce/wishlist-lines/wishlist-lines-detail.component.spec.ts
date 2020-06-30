import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { WishlistLinesDetailComponent } from 'app/entities/vscommerce/wishlist-lines/wishlist-lines-detail.component';
import { WishlistLines } from 'app/shared/model/vscommerce/wishlist-lines.model';

describe('Component Tests', () => {
  describe('WishlistLines Management Detail Component', () => {
    let comp: WishlistLinesDetailComponent;
    let fixture: ComponentFixture<WishlistLinesDetailComponent>;
    const route = ({ data: of({ wishlistLines: new WishlistLines(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [WishlistLinesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WishlistLinesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WishlistLinesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load wishlistLines on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wishlistLines).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
