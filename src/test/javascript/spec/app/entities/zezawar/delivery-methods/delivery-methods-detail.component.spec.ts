import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DeliveryMethodsDetailComponent } from 'app/entities/zezawar/delivery-methods/delivery-methods-detail.component';
import { DeliveryMethods } from 'app/shared/model/zezawar/delivery-methods.model';

describe('Component Tests', () => {
  describe('DeliveryMethods Management Detail Component', () => {
    let comp: DeliveryMethodsDetailComponent;
    let fixture: ComponentFixture<DeliveryMethodsDetailComponent>;
    const route = ({ data: of({ deliveryMethods: new DeliveryMethods(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DeliveryMethodsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DeliveryMethodsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeliveryMethodsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load deliveryMethods on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.deliveryMethods).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
