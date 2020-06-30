import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { InvoiceLinesService } from 'app/entities/vscommerce/invoice-lines/invoice-lines.service';
import { IInvoiceLines, InvoiceLines } from 'app/shared/model/vscommerce/invoice-lines.model';

describe('Service Tests', () => {
  describe('InvoiceLines Service', () => {
    let injector: TestBed;
    let service: InvoiceLinesService;
    let httpMock: HttpTestingController;
    let elemDefault: IInvoiceLines;
    let expectedResult: IInvoiceLines | IInvoiceLines[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InvoiceLinesService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new InvoiceLines(0, 'AAAAAAA', 0, 0, 0, 0, 0, 0, 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a InvoiceLines', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.create(new InvoiceLines()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a InvoiceLines', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            quantity: 1,
            unitPrice: 1,
            taxRate: 1,
            taxAmount: 1,
            lineProfit: 1,
            extendedPrice: 1,
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of InvoiceLines', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            quantity: 1,
            unitPrice: 1,
            taxRate: 1,
            taxAmount: 1,
            lineProfit: 1,
            extendedPrice: 1,
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a InvoiceLines', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
