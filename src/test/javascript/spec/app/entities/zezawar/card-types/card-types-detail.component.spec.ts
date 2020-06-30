import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CardTypesDetailComponent } from 'app/entities/zezawar/card-types/card-types-detail.component';
import { CardTypes } from 'app/shared/model/zezawar/card-types.model';

describe('Component Tests', () => {
  describe('CardTypes Management Detail Component', () => {
    let comp: CardTypesDetailComponent;
    let fixture: ComponentFixture<CardTypesDetailComponent>;
    const route = ({ data: of({ cardTypes: new CardTypes(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CardTypesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CardTypesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CardTypesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cardTypes on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cardTypes).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
