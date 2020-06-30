import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ShoppingCartsComponent } from 'app/entities/vscommerce/shopping-carts/shopping-carts.component';
import { ShoppingCartsService } from 'app/entities/vscommerce/shopping-carts/shopping-carts.service';
import { ShoppingCarts } from 'app/shared/model/vscommerce/shopping-carts.model';

describe('Component Tests', () => {
  describe('ShoppingCarts Management Component', () => {
    let comp: ShoppingCartsComponent;
    let fixture: ComponentFixture<ShoppingCartsComponent>;
    let service: ShoppingCartsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ShoppingCartsComponent],
      })
        .overrideTemplate(ShoppingCartsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShoppingCartsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShoppingCartsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ShoppingCarts(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.shoppingCarts && comp.shoppingCarts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
