import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BankAccountsService } from 'app/entities/vscommerce/bank-accounts/bank-accounts.service';
import { IBankAccounts, BankAccounts } from 'app/shared/model/vscommerce/bank-accounts.model';

describe('Service Tests', () => {
  describe('BankAccounts Service', () => {
    let injector: TestBed;
    let service: BankAccountsService;
    let httpMock: HttpTestingController;
    let elemDefault: IBankAccounts;
    let expectedResult: IBankAccounts | IBankAccounts[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BankAccountsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new BankAccounts(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            validForm: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a BankAccounts', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            validForm: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            validForm: currentDate,
            validTo: currentDate,
          },
          returnedFromService
        );

        service.create(new BankAccounts()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a BankAccounts', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            branch: 'BBBBBB',
            code: 'BBBBBB',
            number: 'BBBBBB',
            type: 'BBBBBB',
            bank: 'BBBBBB',
            internationalCode: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            validForm: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            validForm: currentDate,
            validTo: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of BankAccounts', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            branch: 'BBBBBB',
            code: 'BBBBBB',
            number: 'BBBBBB',
            type: 'BBBBBB',
            bank: 'BBBBBB',
            internationalCode: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            validForm: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            validForm: currentDate,
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

      it('should delete a BankAccounts', () => {
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
