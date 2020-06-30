import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TaxClassDetailComponent } from 'app/entities/vscommerce/tax-class/tax-class-detail.component';
import { TaxClass } from 'app/shared/model/vscommerce/tax-class.model';

describe('Component Tests', () => {
  describe('TaxClass Management Detail Component', () => {
    let comp: TaxClassDetailComponent;
    let fixture: ComponentFixture<TaxClassDetailComponent>;
    const route = ({ data: of({ taxClass: new TaxClass(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TaxClassDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TaxClassDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TaxClassDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load taxClass on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.taxClass).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
