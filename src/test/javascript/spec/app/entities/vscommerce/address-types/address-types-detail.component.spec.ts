import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AddressTypesDetailComponent } from 'app/entities/vscommerce/address-types/address-types-detail.component';
import { AddressTypes } from 'app/shared/model/vscommerce/address-types.model';

describe('Component Tests', () => {
  describe('AddressTypes Management Detail Component', () => {
    let comp: AddressTypesDetailComponent;
    let fixture: ComponentFixture<AddressTypesDetailComponent>;
    const route = ({ data: of({ addressTypes: new AddressTypes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AddressTypesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AddressTypesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AddressTypesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load addressTypes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.addressTypes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
