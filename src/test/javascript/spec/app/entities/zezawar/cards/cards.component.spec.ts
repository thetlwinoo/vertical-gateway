import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CardsComponent } from 'app/entities/zezawar/cards/cards.component';
import { CardsService } from 'app/entities/zezawar/cards/cards.service';
import { Cards } from 'app/shared/model/zezawar/cards.model';

describe('Component Tests', () => {
  describe('Cards Management Component', () => {
    let comp: CardsComponent;
    let fixture: ComponentFixture<CardsComponent>;
    let service: CardsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardsComponent],
      })
        .overrideTemplate(CardsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CardsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CardsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cards(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cards && comp.cards[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
