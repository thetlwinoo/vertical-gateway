import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DeliveryMethodsService } from 'app/entities/zezawar/delivery-methods/delivery-methods.service';
import { IDeliveryMethods, DeliveryMethods } from 'app/shared/model/zezawar/delivery-methods.model';

describe('Service Tests', () => {
  describe('DeliveryMethods Service', () => {
    let injector: TestBed;
    let service: DeliveryMethodsService;
    let httpMock: HttpTestingController;
    let elemDefault: IDeliveryMethods;
    let expectedResult: IDeliveryMethods | IDeliveryMethods[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DeliveryMethodsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new DeliveryMethods(0, 'AAAAAAA', currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
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

      it('should create a DeliveryMethods', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            validFrom: currentDate,
            validTo: currentDate,
          },
          returnedFromService
        );

        service.create(new DeliveryMethods()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DeliveryMethods', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
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

      it('should return a list of DeliveryMethods', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
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

      it('should delete a DeliveryMethods', () => {
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
