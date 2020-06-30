import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CustomersService } from 'app/entities/vscommerce/customers/customers.service';
import { ICustomers, Customers } from 'app/shared/model/vscommerce/customers.model';

describe('Service Tests', () => {
  describe('Customers Service', () => {
    let injector: TestBed;
    let service: CustomersService;
    let httpMock: HttpTestingController;
    let elemDefault: ICustomers;
    let expectedResult: ICustomers | ICustomers[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CustomersService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Customers(0, 'AAAAAAA', currentDate, 0, false, false, 0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            accountOpenedDate: currentDate.format(DATE_TIME_FORMAT),
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Customers', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            accountOpenedDate: currentDate.format(DATE_TIME_FORMAT),
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            accountOpenedDate: currentDate,
            validFrom: currentDate,
            validTo: currentDate,
          },
          returnedFromService
        );

        service.create(new Customers()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Customers', () => {
        const returnedFromService = Object.assign(
          {
            accountNumber: 'BBBBBB',
            accountOpenedDate: currentDate.format(DATE_TIME_FORMAT),
            standardDiscountPercentage: 1,
            isStatementSent: true,
            isOnCreditHold: true,
            paymentDays: 1,
            deliveryRun: 'BBBBBB',
            runPosition: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            accountOpenedDate: currentDate,
            validFrom: currentDate,
            validTo: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Customers', () => {
        const returnedFromService = Object.assign(
          {
            accountNumber: 'BBBBBB',
            accountOpenedDate: currentDate.format(DATE_TIME_FORMAT),
            standardDiscountPercentage: 1,
            isStatementSent: true,
            isOnCreditHold: true,
            paymentDays: 1,
            deliveryRun: 'BBBBBB',
            runPosition: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            accountOpenedDate: currentDate,
            validFrom: currentDate,
            validTo: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Customers', () => {
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
