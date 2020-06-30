import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ComparesDetailComponent } from 'app/entities/zezawar/compares/compares-detail.component';
import { Compares } from 'app/shared/model/zezawar/compares.model';

describe('Component Tests', () => {
  describe('Compares Management Detail Component', () => {
    let comp: ComparesDetailComponent;
    let fixture: ComponentFixture<ComparesDetailComponent>;
    const route = ({ data: of({ compares: new Compares(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ComparesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ComparesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ComparesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load compares on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.compares).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
