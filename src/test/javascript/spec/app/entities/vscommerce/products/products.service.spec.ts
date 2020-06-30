import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProductsService } from 'app/entities/vscommerce/products/products.service';
import { IProducts, Products } from 'app/shared/model/vscommerce/products.model';

describe('Service Tests', () => {
  describe('Products Service', () => {
    let injector: TestBed;
    let service: ProductsService;
    let httpMock: HttpTestingController;
    let elemDefault: IProducts;
    let expectedResult: IProducts | IProducts[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProductsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Products(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        0,
        0,
        0,
        false,
        false,
        false,
        'AAAAAAA',
        currentDate,
        currentDate,
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
            releaseDate: currentDate.format(DATE_TIME_FORMAT),
            availableDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Products', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
            releaseDate: currentDate.format(DATE_TIME_FORMAT),
            availableDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastEditedWhen: currentDate,
            releaseDate: currentDate,
            availableDate: currentDate,
          },
          returnedFromService
        );

        service.create(new Products()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Products', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            handle: 'BBBBBB',
            productNumber: 'BBBBBB',
            searchDetails: 'BBBBBB',
            sellCount: 1,
            stockItemString: 'BBBBBB',
            totalWishlist: 1,
            totalStars: 1,
            discountedPercentage: 1,
            preferredInd: true,
            availableDeliveryInd: true,
            activeInd: true,
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
            releaseDate: currentDate.format(DATE_TIME_FORMAT),
            availableDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastEditedWhen: currentDate,
            releaseDate: currentDate,
            availableDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Products', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            handle: 'BBBBBB',
            productNumber: 'BBBBBB',
            searchDetails: 'BBBBBB',
            sellCount: 1,
            stockItemString: 'BBBBBB',
            totalWishlist: 1,
            totalStars: 1,
            discountedPercentage: 1,
            preferredInd: true,
            availableDeliveryInd: true,
            activeInd: true,
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
            releaseDate: currentDate.format(DATE_TIME_FORMAT),
            availableDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            lastEditedWhen: currentDate,
            releaseDate: currentDate,
            availableDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Products', () => {
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
