import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PeopleService } from 'app/entities/vscommerce/people/people.service';
import { IPeople, People } from 'app/shared/model/vscommerce/people.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

describe('Service Tests', () => {
  describe('People Service', () => {
    let injector: TestBed;
    let service: PeopleService;
    let httpMock: HttpTestingController;
    let elemDefault: IPeople;
    let expectedResult: IPeople | IPeople[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PeopleService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new People(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        Gender.MALE,
        currentDate,
        false,
        'AAAAAAA',
        false,
        false,
        false,
        false,
        false,
        false,
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
            dateOfBirth: currentDate.format(DATE_TIME_FORMAT),
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

      it('should create a People', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateOfBirth: currentDate.format(DATE_TIME_FORMAT),
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfBirth: currentDate,
            validFrom: currentDate,
            validTo: currentDate,
          },
          returnedFromService
        );

        service.create(new People()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a People', () => {
        const returnedFromService = Object.assign(
          {
            fullName: 'BBBBBB',
            preferredName: 'BBBBBB',
            searchName: 'BBBBBB',
            gender: 'BBBBBB',
            dateOfBirth: currentDate.format(DATE_TIME_FORMAT),
            isPermittedToLogon: true,
            logonName: 'BBBBBB',
            isExternalLogonProvider: true,
            isSystemUser: true,
            isEmployee: true,
            isSalesPerson: true,
            isGuestUser: true,
            emailPromotion: true,
            userPreferences: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            emailAddress: 'BBBBBB',
            customFields: 'BBBBBB',
            otherLanguages: 'BBBBBB',
            userId: 'BBBBBB',
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfBirth: currentDate,
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

      it('should return a list of People', () => {
        const returnedFromService = Object.assign(
          {
            fullName: 'BBBBBB',
            preferredName: 'BBBBBB',
            searchName: 'BBBBBB',
            gender: 'BBBBBB',
            dateOfBirth: currentDate.format(DATE_TIME_FORMAT),
            isPermittedToLogon: true,
            logonName: 'BBBBBB',
            isExternalLogonProvider: true,
            isSystemUser: true,
            isEmployee: true,
            isSalesPerson: true,
            isGuestUser: true,
            emailPromotion: true,
            userPreferences: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            emailAddress: 'BBBBBB',
            customFields: 'BBBBBB',
            otherLanguages: 'BBBBBB',
            userId: 'BBBBBB',
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateOfBirth: currentDate,
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

      it('should delete a People', () => {
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
