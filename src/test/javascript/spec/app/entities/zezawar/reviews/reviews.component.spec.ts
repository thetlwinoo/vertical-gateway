import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ReviewsComponent } from 'app/entities/zezawar/reviews/reviews.component';
import { ReviewsService } from 'app/entities/zezawar/reviews/reviews.service';
import { Reviews } from 'app/shared/model/zezawar/reviews.model';

describe('Component Tests', () => {
  describe('Reviews Management Component', () => {
    let comp: ReviewsComponent;
    let fixture: ComponentFixture<ReviewsComponent>;
    let service: ReviewsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ReviewsComponent],
      })
        .overrideTemplate(ReviewsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReviewsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReviewsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Reviews(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.reviews && comp.reviews[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
