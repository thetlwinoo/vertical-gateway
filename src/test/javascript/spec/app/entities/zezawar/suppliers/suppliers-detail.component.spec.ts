import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SuppliersDetailComponent } from 'app/entities/zezawar/suppliers/suppliers-detail.component';
import { Suppliers } from 'app/shared/model/zezawar/suppliers.model';

describe('Component Tests', () => {
  describe('Suppliers Management Detail Component', () => {
    let comp: SuppliersDetailComponent;
    let fixture: ComponentFixture<SuppliersDetailComponent>;
    const route = ({ data: of({ suppliers: new Suppliers(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SuppliersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SuppliersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SuppliersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load suppliers on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.suppliers).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
