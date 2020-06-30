import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { StockItemsService } from 'app/entities/zezawar/stock-items/stock-items.service';
import { IStockItems, StockItems } from 'app/shared/model/zezawar/stock-items.model';

describe('Service Tests', () => {
  describe('StockItems Service', () => {
    let injector: TestBed;
    let service: StockItemsService;
    let httpMock: HttpTestingController;
    let elemDefault: IStockItems;
    let expectedResult: IStockItems | IStockItems[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(StockItemsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new StockItems(
        0,
        'AAAAAAA',
        'AAAAAAA',
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
        0,
        0,
        0,
        0,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        currentDate,
        0,
        'AAAAAAA',
        'AAAAAAA',
        false,
        'AAAAAAA',
        currentDate
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            sellStartDate: currentDate.format(DATE_TIME_FORMAT),
            sellEndDate: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a StockItems', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            sellStartDate: currentDate.format(DATE_TIME_FORMAT),
            sellEndDate: currentDate.format(DATE_TIME_FORMAT),
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sellStartDate: currentDate,
            sellEndDate: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.create(new StockItems()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a StockItems', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            vendorCode: 'BBBBBB',
            vendorSKU: 'BBBBBB',
            generatedSKU: 'BBBBBB',
            barcode: 'BBBBBB',
            unitPrice: 1,
            recommendedRetailPrice: 1,
            quantityOnHand: 1,
            itemLength: 1,
            itemWidth: 1,
            itemHeight: 1,
            itemWeight: 1,
            itemPackageLength: 1,
            itemPackageWidth: 1,
            itemPackageHeight: 1,
            itemPackageWeight: 1,
            noOfPieces: 1,
            noOfItems: 1,
            manufacture: 'BBBBBB',
            marketingComments: 'BBBBBB',
            internalComments: 'BBBBBB',
            sellStartDate: currentDate.format(DATE_TIME_FORMAT),
            sellEndDate: currentDate.format(DATE_TIME_FORMAT),
            sellCount: 1,
            customFields: 'BBBBBB',
            thumbnailUrl: 'BBBBBB',
            activeInd: true,
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sellStartDate: currentDate,
            sellEndDate: currentDate,
            lastEditedWhen: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of StockItems', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            vendorCode: 'BBBBBB',
            vendorSKU: 'BBBBBB',
            generatedSKU: 'BBBBBB',
            barcode: 'BBBBBB',
            unitPrice: 1,
            recommendedRetailPrice: 1,
            quantityOnHand: 1,
            itemLength: 1,
            itemWidth: 1,
            itemHeight: 1,
            itemWeight: 1,
            itemPackageLength: 1,
            itemPackageWidth: 1,
            itemPackageHeight: 1,
            itemPackageWeight: 1,
            noOfPieces: 1,
            noOfItems: 1,
            manufacture: 'BBBBBB',
            marketingComments: 'BBBBBB',
            internalComments: 'BBBBBB',
            sellStartDate: currentDate.format(DATE_TIME_FORMAT),
            sellEndDate: currentDate.format(DATE_TIME_FORMAT),
            sellCount: 1,
            customFields: 'BBBBBB',
            thumbnailUrl: 'BBBBBB',
            activeInd: true,
            lastEditedBy: 'BBBBBB',
            lastEditedWhen: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            sellStartDate: currentDate,
            sellEndDate: currentDate,
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

      it('should delete a StockItems', () => {
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
