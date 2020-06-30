import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ReceiptsComponent } from 'app/entities/zezawar/receipts/receipts.component';
import { ReceiptsService } from 'app/entities/zezawar/receipts/receipts.service';
import { Receipts } from 'app/shared/model/zezawar/receipts.model';

describe('Component Tests', () => {
  describe('Receipts Management Component', () => {
    let comp: ReceiptsComponent;
    let fixture: ComponentFixture<ReceiptsComponent>;
    let service: ReceiptsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ReceiptsComponent],
      })
        .overrideTemplate(ReceiptsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReceiptsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReceiptsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Receipts(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.receipts && comp.receipts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
