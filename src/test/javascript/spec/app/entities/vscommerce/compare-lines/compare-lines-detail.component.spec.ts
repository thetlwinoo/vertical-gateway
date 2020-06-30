import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CompareLinesDetailComponent } from 'app/entities/vscommerce/compare-lines/compare-lines-detail.component';
import { CompareLines } from 'app/shared/model/vscommerce/compare-lines.model';

describe('Component Tests', () => {
  describe('CompareLines Management Detail Component', () => {
    let comp: CompareLinesDetailComponent;
    let fixture: ComponentFixture<CompareLinesDetailComponent>;
    const route = ({ data: of({ compareLines: new CompareLines(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CompareLinesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CompareLinesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CompareLinesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load compareLines on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.compareLines).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
