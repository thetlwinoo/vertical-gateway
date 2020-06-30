import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { StateProvincesDetailComponent } from 'app/entities/vscommerce/state-provinces/state-provinces-detail.component';
import { StateProvinces } from 'app/shared/model/vscommerce/state-provinces.model';

describe('Component Tests', () => {
  describe('StateProvinces Management Detail Component', () => {
    let comp: StateProvincesDetailComponent;
    let fixture: ComponentFixture<StateProvincesDetailComponent>;
    const route = ({ data: of({ stateProvinces: new StateProvinces(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [StateProvincesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(StateProvincesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StateProvincesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load stateProvinces on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.stateProvinces).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
