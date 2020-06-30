import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PaymentMethodsComponent } from 'app/entities/zezawar/payment-methods/payment-methods.component';
import { PaymentMethodsService } from 'app/entities/zezawar/payment-methods/payment-methods.service';
import { PaymentMethods } from 'app/shared/model/zezawar/payment-methods.model';

describe('Component Tests', () => {
  describe('PaymentMethods Management Component', () => {
    let comp: PaymentMethodsComponent;
    let fixture: ComponentFixture<PaymentMethodsComponent>;
    let service: PaymentMethodsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PaymentMethodsComponent],
      })
        .overrideTemplate(PaymentMethodsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentMethodsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentMethodsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PaymentMethods(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paymentMethods && comp.paymentMethods[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
