import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { InvoiceLinesDetailComponent } from 'app/entities/vscommerce/invoice-lines/invoice-lines-detail.component';
import { InvoiceLines } from 'app/shared/model/vscommerce/invoice-lines.model';

describe('Component Tests', () => {
  describe('InvoiceLines Management Detail Component', () => {
    let comp: InvoiceLinesDetailComponent;
    let fixture: ComponentFixture<InvoiceLinesDetailComponent>;
    const route = ({ data: of({ invoiceLines: new InvoiceLines(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [InvoiceLinesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(InvoiceLinesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(InvoiceLinesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load invoiceLines on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.invoiceLines).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
