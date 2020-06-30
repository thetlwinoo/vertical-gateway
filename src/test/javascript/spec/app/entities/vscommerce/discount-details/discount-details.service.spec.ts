import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DiscountDetailsService } from 'app/entities/vscommerce/discount-details/discount-details.service';
import { IDiscountDetails, DiscountDetails } from 'app/shared/model/vscommerce/discount-details.model';

describe('Service Tests', () => {
  describe('DiscountDetails Service', () => {
    let injector: TestBed;
    let service: DiscountDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IDiscountDetails;
    let expectedResult: IDiscountDetails | IDiscountDetails[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DiscountDetailsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new DiscountDetails(0, 0, false, false, false, 'AAAAAAA', 0, 0, 0, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            modifiedDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DiscountDetails', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            modifiedDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            modifiedDate: currentDate,
          },
          returnedFromService
        );

        service.create(new DiscountDetails()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DiscountDetails', () => {
        const returnedFromService = Object.assign(
          {
            amount: 1,
            isPercentage: true,
            isAllowCombinationDiscount: true,
            isFinalBillDiscount: true,
            name: 'BBBBBB',
            startCount: 1,
            endCount: 1,
            multiplyCount: 1,
            modifiedDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            modifiedDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DiscountDetails', () => {
        const returnedFromService = Object.assign(
          {
            amount: 1,
            isPercentage: true,
            isAllowCombinationDiscount: true,
            isFinalBillDiscount: true,
            name: 'BBBBBB',
            startCount: 1,
            endCount: 1,
            multiplyCount: 1,
            modifiedDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            modifiedDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DiscountDetails', () => {
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
