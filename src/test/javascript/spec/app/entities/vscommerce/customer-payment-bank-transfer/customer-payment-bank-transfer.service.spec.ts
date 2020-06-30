import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CustomerPaymentBankTransferService } from 'app/entities/vscommerce/customer-payment-bank-transfer/customer-payment-bank-transfer.service';
import {
  ICustomerPaymentBankTransfer,
  CustomerPaymentBankTransfer,
} from 'app/shared/model/vscommerce/customer-payment-bank-transfer.model';

describe('Service Tests', () => {
  describe('CustomerPaymentBankTransfer Service', () => {
    let injector: TestBed;
    let service: CustomerPaymentBankTransferService;
    let httpMock: HttpTestingController;
    let elemDefault: ICustomerPaymentBankTransfer;
    let expectedResult: ICustomerPaymentBankTransfer | ICustomerPaymentBankTransfer[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CustomerPaymentBankTransferService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new CustomerPaymentBankTransfer(0, 'AAAAAAA', 'AAAAAAA', currentDate, 0, 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateOfTransfer: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CustomerPaymentBankTransfer', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateOfTransfer: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfTransfer: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.create(new CustomerPaymentBankTransfer()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CustomerPaymentBankTransfer', () => {
        const returnedFromService = Object.assign(
          {
            receiptImageUrl: 'BBBBBB',
            nameInBankAccount: 'BBBBBB',
            dateOfTransfer: currentDate.format(DATE_TIME_FORMAT),
            amountTransferred: 1,
            lastEdityBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfTransfer: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CustomerPaymentBankTransfer', () => {
        const returnedFromService = Object.assign(
          {
            receiptImageUrl: 'BBBBBB',
            nameInBankAccount: 'BBBBBB',
            dateOfTransfer: currentDate.format(DATE_TIME_FORMAT),
            amountTransferred: 1,
            lastEdityBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfTransfer: currentDate,
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

      it('should delete a CustomerPaymentBankTransfer', () => {
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
