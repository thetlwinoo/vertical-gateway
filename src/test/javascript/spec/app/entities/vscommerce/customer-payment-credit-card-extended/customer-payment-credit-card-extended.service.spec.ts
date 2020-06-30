import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CustomerPaymentCreditCardExtendedService } from 'app/entities/vscommerce/customer-payment-credit-card-extended/customer-payment-credit-card-extended.service';
import {
  ICustomerPaymentCreditCardExtended,
  CustomerPaymentCreditCardExtended,
} from 'app/shared/model/vscommerce/customer-payment-credit-card-extended.model';

describe('Service Tests', () => {
  describe('CustomerPaymentCreditCardExtended Service', () => {
    let injector: TestBed;
    let service: CustomerPaymentCreditCardExtendedService;
    let httpMock: HttpTestingController;
    let elemDefault: ICustomerPaymentCreditCardExtended;
    let expectedResult: ICustomerPaymentCreditCardExtended | ICustomerPaymentCreditCardExtended[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CustomerPaymentCreditCardExtendedService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new CustomerPaymentCreditCardExtended(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            lastEditeWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CustomerPaymentCreditCardExtended', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            lastEditeWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastEditeWhen: currentDate,
          },
          returnedFromService
        );

        service.create(new CustomerPaymentCreditCardExtended()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CustomerPaymentCreditCardExtended', () => {
        const returnedFromService = Object.assign(
          {
            errorCode: 'BBBBBB',
            errorMessage: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            lastEditeWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastEditeWhen: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CustomerPaymentCreditCardExtended', () => {
        const returnedFromService = Object.assign(
          {
            errorCode: 'BBBBBB',
            errorMessage: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            lastEditeWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastEditeWhen: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CustomerPaymentCreditCardExtended', () => {
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
