import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ShippingFeeChartService } from 'app/entities/vscommerce/shipping-fee-chart/shipping-fee-chart.service';
import { IShippingFeeChart, ShippingFeeChart } from 'app/shared/model/vscommerce/shipping-fee-chart.model';

describe('Service Tests', () => {
  describe('ShippingFeeChart Service', () => {
    let injector: TestBed;
    let service: ShippingFeeChartService;
    let httpMock: HttpTestingController;
    let elemDefault: IShippingFeeChart;
    let expectedResult: IShippingFeeChart | IShippingFeeChart[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ShippingFeeChartService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ShippingFeeChart(0, 'AAAAAAA', 0, 0, 0, 0, 0, 'AAAAAAA', currentDate);
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

      it('should create a ShippingFeeChart', () => {
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

        service.create(new ShippingFeeChart()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ShippingFeeChart', () => {
        const returnedFromService = Object.assign(
          {
            sizeOfPercel: 'BBBBBB',
            minVolumeWeight: 1,
            maxVolumeWeight: 1,
            minActualWeight: 1,
            maxActualWeight: 1,
            price: 1,
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

      it('should return a list of ShippingFeeChart', () => {
        const returnedFromService = Object.assign(
          {
            sizeOfPercel: 'BBBBBB',
            minVolumeWeight: 1,
            maxVolumeWeight: 1,
            minActualWeight: 1,
            maxActualWeight: 1,
            price: 1,
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

      it('should delete a ShippingFeeChart', () => {
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
