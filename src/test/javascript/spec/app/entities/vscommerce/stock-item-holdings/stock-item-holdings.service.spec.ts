import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { StockItemHoldingsService } from 'app/entities/vscommerce/stock-item-holdings/stock-item-holdings.service';
import { IStockItemHoldings, StockItemHoldings } from 'app/shared/model/vscommerce/stock-item-holdings.model';

describe('Service Tests', () => {
  describe('StockItemHoldings Service', () => {
    let injector: TestBed;
    let service: StockItemHoldingsService;
    let httpMock: HttpTestingController;
    let elemDefault: IStockItemHoldings;
    let expectedResult: IStockItemHoldings | IStockItemHoldings[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(StockItemHoldingsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new StockItemHoldings(0, 0, 'AAAAAAA', 0, 0, 0, 0, 'AAAAAAA', currentDate);
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

      it('should create a StockItemHoldings', () => {
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

        service.create(new StockItemHoldings()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a StockItemHoldings', () => {
        const returnedFromService = Object.assign(
          {
            quantityOnHand: 1,
            binLocation: 'BBBBBB',
            lastStockTakeQuantity: 1,
            lastCostPrice: 1,
            reorderLevel: 1,
            targerStockLevel: 1,
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

      it('should return a list of StockItemHoldings', () => {
        const returnedFromService = Object.assign(
          {
            quantityOnHand: 1,
            binLocation: 'BBBBBB',
            lastStockTakeQuantity: 1,
            lastCostPrice: 1,
            reorderLevel: 1,
            targerStockLevel: 1,
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

      it('should delete a StockItemHoldings', () => {
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
