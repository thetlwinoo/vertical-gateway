import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { WishlistLinesComponent } from 'app/entities/vscommerce/wishlist-lines/wishlist-lines.component';
import { WishlistLinesService } from 'app/entities/vscommerce/wishlist-lines/wishlist-lines.service';
import { WishlistLines } from 'app/shared/model/vscommerce/wishlist-lines.model';

describe('Component Tests', () => {
  describe('WishlistLines Management Component', () => {
    let comp: WishlistLinesComponent;
    let fixture: ComponentFixture<WishlistLinesComponent>;
    let service: WishlistLinesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [WishlistLinesComponent],
      })
        .overrideTemplate(WishlistLinesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WishlistLinesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WishlistLinesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new WishlistLines(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.wishlistLines && comp.wishlistLines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
