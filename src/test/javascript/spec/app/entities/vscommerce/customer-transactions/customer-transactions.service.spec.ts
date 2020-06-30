import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CustomerTransactionsService } from 'app/entities/vscommerce/customer-transactions/customer-transactions.service';
import { ICustomerTransactions, CustomerTransactions } from 'app/shared/model/vscommerce/customer-transactions.model';

describe('Service Tests', () => {
  describe('CustomerTransactions Service', () => {
    let injector: TestBed;
    let service: CustomerTransactionsService;
    let httpMock: HttpTestingController;
    let elemDefault: ICustomerTransactions;
    let expectedResult: ICustomerTransactions | ICustomerTransactions[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CustomerTransactionsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new CustomerTransactions(0, currentDate, 0, 0, 0, 0, currentDate, false, 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            transactionDate: currentDate.format(DATE_TIME_FORMAT),
            finalizationDate: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CustomerTransactions', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            transactionDate: currentDate.format(DATE_TIME_FORMAT),
            finalizationDate: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            transactionDate: currentDate,
            finalizationDate: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.create(new CustomerTransactions()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CustomerTransactions', () => {
        const returnedFromService = Object.assign(
          {
            transactionDate: currentDate.format(DATE_TIME_FORMAT),
            amountExcludingTax: 1,
            taxAmount: 1,
            transactionAmount: 1,
            outstandingBalance: 1,
            finalizationDate: currentDate.format(DATE_TIME_FORMAT),
            isFinalized: true,
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            transactionDate: currentDate,
            finalizationDate: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CustomerTransactions', () => {
        const returnedFromService = Object.assign(
          {
            transactionDate: currentDate.format(DATE_TIME_FORMAT),
            amountExcludingTax: 1,
            taxAmount: 1,
            transactionAmount: 1,
            outstandingBalance: 1,
            finalizationDate: currentDate.format(DATE_TIME_FORMAT),
            isFinalized: true,
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            transactionDate: currentDate,
            finalizationDate: currentDate,
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

      it('should delete a CustomerTransactions', () => {
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
