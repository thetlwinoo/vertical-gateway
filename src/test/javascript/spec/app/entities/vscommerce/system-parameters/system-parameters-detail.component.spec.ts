import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SystemParametersDetailComponent } from 'app/entities/vscommerce/system-parameters/system-parameters-detail.component';
import { SystemParameters } from 'app/shared/model/vscommerce/system-parameters.model';

describe('Component Tests', () => {
  describe('SystemParameters Management Detail Component', () => {
    let comp: SystemParametersDetailComponent;
    let fixture: ComponentFixture<SystemParametersDetailComponent>;
    const route = ({ data: of({ systemParameters: new SystemParameters(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SystemParametersDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SystemParametersDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SystemParametersDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load systemParameters on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.systemParameters).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
