import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CustomerPaymentCreditCardService } from 'app/entities/zezawar/customer-payment-credit-card/customer-payment-credit-card.service';
import { ICustomerPaymentCreditCard, CustomerPaymentCreditCard } from 'app/shared/model/zezawar/customer-payment-credit-card.model';

describe('Service Tests', () => {
  describe('CustomerPaymentCreditCard Service', () => {
    let injector: TestBed;
    let service: CustomerPaymentCreditCardService;
    let httpMock: HttpTestingController;
    let elemDefault: ICustomerPaymentCreditCard;
    let expectedResult: ICustomerPaymentCreditCard | ICustomerPaymentCreditCard[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CustomerPaymentCreditCardService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new CustomerPaymentCreditCard(
        0,
        'AAAAAAA',
        0,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate
      );
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

      it('should create a CustomerPaymentCreditCard', () => {
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

        service.create(new CustomerPaymentCreditCard()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CustomerPaymentCreditCard', () => {
        const returnedFromService = Object.assign(
          {
            creditCardNumber: 'BBBBBB',
            creditCardExpiryMonth: 1,
            creditCardExpiryYear: 1,
            amount: 1,
            batchId: 'BBBBBB',
            responseCode: 'BBBBBB',
            approvalCode: 'BBBBBB',
            responseData: 'BBBBBB',
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

      it('should return a list of CustomerPaymentCreditCard', () => {
        const returnedFromService = Object.assign(
          {
            creditCardNumber: 'BBBBBB',
            creditCardExpiryMonth: 1,
            creditCardExpiryYear: 1,
            amount: 1,
            batchId: 'BBBBBB',
            responseCode: 'BBBBBB',
            approvalCode: 'BBBBBB',
            responseData: 'BBBBBB',
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

      it('should delete a CustomerPaymentCreditCard', () => {
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
