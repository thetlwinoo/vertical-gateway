import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { BuyingGroupsComponent } from 'app/entities/zezawar/buying-groups/buying-groups.component';
import { BuyingGroupsService } from 'app/entities/zezawar/buying-groups/buying-groups.service';
import { BuyingGroups } from 'app/shared/model/zezawar/buying-groups.model';

describe('Component Tests', () => {
  describe('BuyingGroups Management Component', () => {
    let comp: BuyingGroupsComponent;
    let fixture: ComponentFixture<BuyingGroupsComponent>;
    let service: BuyingGroupsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BuyingGroupsComponent],
      })
        .overrideTemplate(BuyingGroupsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BuyingGroupsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BuyingGroupsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BuyingGroups(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.buyingGroups && comp.buyingGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
