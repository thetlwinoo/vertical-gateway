import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OrderPackagesService } from 'app/entities/vscommerce/order-packages/order-packages.service';
import { IOrderPackages, OrderPackages } from 'app/shared/model/vscommerce/order-packages.model';

describe('Service Tests', () => {
  describe('OrderPackages Service', () => {
    let injector: TestBed;
    let service: OrderPackagesService;
    let httpMock: HttpTestingController;
    let elemDefault: IOrderPackages;
    let expectedResult: IOrderPackages | IOrderPackages[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OrderPackagesService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new OrderPackages(
        0,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        currentDate,
        currentDate,
        0,
        'AAAAAAA',
        0,
        'AAAAAAA',
        false,
        false,
        'AAAAAAA',
        'AAAAAAA',
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            expectedDeliveryDate: currentDate.format(DATE_TIME_FORMAT),
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            customerReviewedOn: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a OrderPackages', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            expectedDeliveryDate: currentDate.format(DATE_TIME_FORMAT),
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            customerReviewedOn: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expectedDeliveryDate: currentDate,
            pickingCompletedWhen: currentDate,
            customerReviewedOn: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.create(new OrderPackages()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a OrderPackages', () => {
        const returnedFromService = Object.assign(
          {
            expectedDeliveryDate: currentDate.format(DATE_TIME_FORMAT),
            comments: 'BBBBBB',
            deliveryInstructions: 'BBBBBB',
            internalComments: 'BBBBBB',
            packageShippingFee: 1,
            packageShippingFeeDiscount: 1,
            packagePrice: 1,
            packageSubTotal: 1,
            packageTaxAmount: 1,
            packageVoucherDiscount: 1,
            packagePromotionDiscount: 1,
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            customerReviewedOn: currentDate.format(DATE_TIME_FORMAT),
            sellerRating: 1,
            sellerReview: 'BBBBBB',
            deliveryRating: 1,
            deliveryReview: 'BBBBBB',
            reviewAsAnonymous: true,
            completedReview: true,
            orderPackageDetails: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expectedDeliveryDate: currentDate,
            pickingCompletedWhen: currentDate,
            customerReviewedOn: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of OrderPackages', () => {
        const returnedFromService = Object.assign(
          {
            expectedDeliveryDate: currentDate.format(DATE_TIME_FORMAT),
            comments: 'BBBBBB',
            deliveryInstructions: 'BBBBBB',
            internalComments: 'BBBBBB',
            packageShippingFee: 1,
            packageShippingFeeDiscount: 1,
            packagePrice: 1,
            packageSubTotal: 1,
            packageTaxAmount: 1,
            packageVoucherDiscount: 1,
            packagePromotionDiscount: 1,
            pickingCompletedWhen: currentDate.format(DATE_TIME_FORMAT),
            customerReviewedOn: currentDate.format(DATE_TIME_FORMAT),
            sellerRating: 1,
            sellerReview: 'BBBBBB',
            deliveryRating: 1,
            deliveryReview: 'BBBBBB',
            reviewAsAnonymous: true,
            completedReview: true,
            orderPackageDetails: 'BBBBBB',
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            expectedDeliveryDate: currentDate,
            pickingCompletedWhen: currentDate,
            customerReviewedOn: currentDate,
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

      it('should delete a OrderPackages', () => {
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
