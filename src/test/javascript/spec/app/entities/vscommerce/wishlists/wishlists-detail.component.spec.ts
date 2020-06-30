import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { WishlistsDetailComponent } from 'app/entities/vscommerce/wishlists/wishlists-detail.component';
import { Wishlists } from 'app/shared/model/vscommerce/wishlists.model';

describe('Component Tests', () => {
  describe('Wishlists Management Detail Component', () => {
    let comp: WishlistsDetailComponent;
    let fixture: ComponentFixture<WishlistsDetailComponent>;
    const route = ({ data: of({ wishlists: new Wishlists(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [WishlistsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(WishlistsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(WishlistsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load wishlists on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.wishlists).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
