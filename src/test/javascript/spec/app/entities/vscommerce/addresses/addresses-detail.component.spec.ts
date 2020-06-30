import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AddressesDetailComponent } from 'app/entities/vscommerce/addresses/addresses-detail.component';
import { Addresses } from 'app/shared/model/vscommerce/addresses.model';

describe('Component Tests', () => {
  describe('Addresses Management Detail Component', () => {
    let comp: AddressesDetailComponent;
    let fixture: ComponentFixture<AddressesDetailComponent>;
    const route = ({ data: of({ addresses: new Addresses(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AddressesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AddressesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AddressesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load addresses on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.addresses).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
