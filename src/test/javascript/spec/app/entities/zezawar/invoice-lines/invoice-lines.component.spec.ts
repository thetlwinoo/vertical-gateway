import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { InvoiceLinesComponent } from 'app/entities/zezawar/invoice-lines/invoice-lines.component';
import { InvoiceLinesService } from 'app/entities/zezawar/invoice-lines/invoice-lines.service';
import { InvoiceLines } from 'app/shared/model/zezawar/invoice-lines.model';

describe('Component Tests', () => {
  describe('InvoiceLines Management Component', () => {
    let comp: InvoiceLinesComponent;
    let fixture: ComponentFixture<InvoiceLinesComponent>;
    let service: InvoiceLinesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [InvoiceLinesComponent],
      })
        .overrideTemplate(InvoiceLinesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InvoiceLinesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvoiceLinesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new InvoiceLines(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.invoiceLines && comp.invoiceLines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
