import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { PeopleComponent } from 'app/entities/zezawar/people/people.component';
import { PeopleService } from 'app/entities/zezawar/people/people.service';
import { People } from 'app/shared/model/zezawar/people.model';

describe('Component Tests', () => {
  describe('People Management Component', () => {
    let comp: PeopleComponent;
    let fixture: ComponentFixture<PeopleComponent>;
    let service: PeopleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PeopleComponent],
      })
        .overrideTemplate(PeopleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PeopleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PeopleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new People(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.people && comp.people[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
