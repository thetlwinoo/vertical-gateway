import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ReviewLinesComponent } from 'app/entities/vscommerce/review-lines/review-lines.component';
import { ReviewLinesService } from 'app/entities/vscommerce/review-lines/review-lines.service';
import { ReviewLines } from 'app/shared/model/vscommerce/review-lines.model';

describe('Component Tests', () => {
  describe('ReviewLines Management Component', () => {
    let comp: ReviewLinesComponent;
    let fixture: ComponentFixture<ReviewLinesComponent>;
    let service: ReviewLinesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ReviewLinesComponent],
      })
        .overrideTemplate(ReviewLinesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReviewLinesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReviewLinesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ReviewLines(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reviewLines && comp.reviewLines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
