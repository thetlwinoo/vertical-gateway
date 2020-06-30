import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OrdersService } from 'app/entities/zezawar/orders/orders.service';
import { IOrders, Orders } from 'app/shared/model/zezawar/orders.model';
import { PaymentStatus } from 'app/shared/model/enumerations/payment-status.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

describe('Service Tests', () => {
  describe('Orders Service', () => {
    let injector: TestBed;
    let service: OrdersService;
    let httpMock: HttpTestingController;
    let elemDefault: IOrders;
    let expectedResult: IOrders | IOrders[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OrdersService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Orders(
        0,
        currentDate,
        currentDate,
        currentDate,
        PaymentStatus.PENDING,
        'AAAAAAA',
        0,
        0,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        OrderStatus.COMPLETED,
        'AAAAAAA',
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            orderDate: currentDate.format(DATE_TIME_FORMAT),
            dueDate: currentDate.format(DATE_TIME_FORMAT),
            expectedDeliveryDate: currentDate.format(DATE_TIME_FORMAT),
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

      it('should create a Orders', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            orderDate: currentDate.format(DATE_TIME_FORMAT),
            dueDate: currentDate.format(DATE_TIME_FORMAT),
            expectedDeliveryDate: currentDate.format(DATE_TIME_FORMAT),
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            orderDate: currentDate,
            dueDate: currentDate,
            expectedDeliveryDate: currentDate,
            pickingCompletedWhen: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.create(new Orders()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Orders', () => {
        const returnedFromService = Object.assign(
          {
            orderDate: currentDate.format(DATE_TIME_FORMAT),
            dueDate: currentDate.format(DATE_TIME_FORMAT),
            expectedDeliveryDate: currentDate.format(DATE_TIME_FORMAT),
            paymentStatus: 'BBBBBB',
            accountNumber: 'BBBBBB',
            subTotal: 1,
            taxAmount: 1,
            frieight: 1,
            totalDue: 1,
            comments: 'BBBBBB',
            deliveryInstructions: 'BBBBBB',
            internalComments: 'BBBBBB',
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            orderDate: currentDate,
            dueDate: currentDate,
            expectedDeliveryDate: currentDate,
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

      it('should return a list of Orders', () => {
        const returnedFromService = Object.assign(
          {
            orderDate: currentDate.format(DATE_TIME_FORMAT),
            dueDate: currentDate.format(DATE_TIME_FORMAT),
            expectedDeliveryDate: currentDate.format(DATE_TIME_FORMAT),
            paymentStatus: 'BBBBBB',
            accountNumber: 'BBBBBB',
            subTotal: 1,
            taxAmount: 1,
            frieight: 1,
            totalDue: 1,
            comments: 'BBBBBB',
            deliveryInstructions: 'BBBBBB',
            internalComments: 'BBBBBB',
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            status: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            orderDate: currentDate,
            dueDate: currentDate,
            expectedDeliveryDate: currentDate,
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

      it('should delete a Orders', () => {
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
