import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ShoppingCartItemsDetailComponent } from 'app/entities/zezawar/shopping-cart-items/shopping-cart-items-detail.component';
import { ShoppingCartItems } from 'app/shared/model/zezawar/shopping-cart-items.model';

describe('Component Tests', () => {
  describe('ShoppingCartItems Management Detail Component', () => {
    let comp: ShoppingCartItemsDetailComponent;
    let fixture: ComponentFixture<ShoppingCartItemsDetailComponent>;
    const route = ({ data: of({ shoppingCartItems: new ShoppingCartItems(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ShoppingCartItemsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ShoppingCartItemsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShoppingCartItemsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load shoppingCartItems on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shoppingCartItems).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
