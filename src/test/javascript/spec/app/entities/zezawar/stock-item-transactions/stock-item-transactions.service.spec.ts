import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { StockItemTransactionsService } from 'app/entities/zezawar/stock-item-transactions/stock-item-transactions.service';
import { IStockItemTransactions, StockItemTransactions } from 'app/shared/model/zezawar/stock-item-transactions.model';

describe('Service Tests', () => {
  describe('StockItemTransactions Service', () => {
    let injector: TestBed;
    let service: StockItemTransactionsService;
    let httpMock: HttpTestingController;
    let elemDefault: IStockItemTransactions;
    let expectedResult: IStockItemTransactions | IStockItemTransactions[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(StockItemTransactionsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new StockItemTransactions(0, currentDate, 0, 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            transactionOccuredWhen: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a StockItemTransactions', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            transactionOccuredWhen: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            transactionOccuredWhen: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.create(new StockItemTransactions()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a StockItemTransactions', () => {
        const returnedFromService = Object.assign(
          {
            transactionOccuredWhen: currentDate.format(DATE_TIME_FORMAT),
            quantity: 1,
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            transactionOccuredWhen: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of StockItemTransactions', () => {
        const returnedFromService = Object.assign(
          {
            transactionOccuredWhen: currentDate.format(DATE_TIME_FORMAT),
            quantity: 1,
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            transactionOccuredWhen: currentDate,
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

      it('should delete a StockItemTransactions', () => {
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
