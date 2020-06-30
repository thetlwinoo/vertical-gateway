import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { BusinessEntityAddressDetailComponent } from 'app/entities/vscommerce/business-entity-address/business-entity-address-detail.component';
import { BusinessEntityAddress } from 'app/shared/model/vscommerce/business-entity-address.model';

describe('Component Tests', () => {
  describe('BusinessEntityAddress Management Detail Component', () => {
    let comp: BusinessEntityAddressDetailComponent;
    let fixture: ComponentFixture<BusinessEntityAddressDetailComponent>;
    const route = ({ data: of({ businessEntityAddress: new BusinessEntityAddress(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BusinessEntityAddressDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BusinessEntityAddressDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BusinessEntityAddressDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load businessEntityAddress on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.businessEntityAddress).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
