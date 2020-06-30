import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OrderLinesService } from 'app/entities/vscommerce/order-lines/order-lines.service';
import { IOrderLines, OrderLines } from 'app/shared/model/vscommerce/order-lines.model';
import { OrderLineStatus } from 'app/shared/model/enumerations/order-line-status.model';

describe('Service Tests', () => {
  describe('OrderLines Service', () => {
    let injector: TestBed;
    let service: OrderLinesService;
    let httpMock: HttpTestingController;
    let elemDefault: IOrderLines;
    let expectedResult: IOrderLines | IOrderLines[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OrderLinesService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new OrderLines(0, 0, 'AAAAAAA', 0, 0, 0, 0, 0, currentDate, OrderLineStatus.AVAILABLE, 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a OrderLines', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            pickingCompletedWhen: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.create(new OrderLines()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a OrderLines', () => {
        const returnedFromService = Object.assign(
          {
            quantity: 1,
            description: 'BBBBBB',
            unitPrice: 1,
            unitPriceDiscount: 1,
            lineTotal: 1,
            taxRate: 1,
            pickedQuantity: 1,
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            pickingCompletedWhen: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of OrderLines', () => {
        const returnedFromService = Object.assign(
          {
            quantity: 1,
            description: 'BBBBBB',
            unitPrice: 1,
            unitPriceDiscount: 1,
            lineTotal: 1,
            taxRate: 1,
            pickedQuantity: 1,
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            pickingCompletedWhen: currentDate,
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

      it('should delete a OrderLines', () => {
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
