import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { InvoicesComponent } from 'app/entities/zezawar/invoices/invoices.component';
import { InvoicesService } from 'app/entities/zezawar/invoices/invoices.service';
import { Invoices } from 'app/shared/model/zezawar/invoices.model';

describe('Component Tests', () => {
  describe('Invoices Management Component', () => {
    let comp: InvoicesComponent;
    let fixture: ComponentFixture<InvoicesComponent>;
    let service: InvoicesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [InvoicesComponent],
      })
        .overrideTemplate(InvoicesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InvoicesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InvoicesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Invoices(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.invoices && comp.invoices[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
