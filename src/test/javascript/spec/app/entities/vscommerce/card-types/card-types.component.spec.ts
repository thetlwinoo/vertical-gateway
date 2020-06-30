import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { CardTypesComponent } from 'app/entities/vscommerce/card-types/card-types.component';
import { CardTypesService } from 'app/entities/vscommerce/card-types/card-types.service';
import { CardTypes } from 'app/shared/model/vscommerce/card-types.model';

describe('Component Tests', () => {
  describe('CardTypes Management Component', () => {
    let comp: CardTypesComponent;
    let fixture: ComponentFixture<CardTypesComponent>;
    let service: CardTypesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardTypesComponent],
      })
        .overrideTemplate(CardTypesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CardTypesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CardTypesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CardTypes(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cardTypes && comp.cardTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
