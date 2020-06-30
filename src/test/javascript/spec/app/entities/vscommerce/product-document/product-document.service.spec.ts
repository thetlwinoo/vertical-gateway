import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProductDocumentService } from 'app/entities/vscommerce/product-document/product-document.service';
import { IProductDocument, ProductDocument } from 'app/shared/model/vscommerce/product-document.model';

describe('Service Tests', () => {
  describe('ProductDocument Service', () => {
    let injector: TestBed;
    let service: ProductDocumentService;
    let httpMock: HttpTestingController;
    let elemDefault: IProductDocument;
    let expectedResult: IProductDocument | IProductDocument[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProductDocumentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ProductDocument(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate
      );
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

      it('should create a ProductDocument', () => {
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

        service.create(new ProductDocument()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProductDocument', () => {
        const returnedFromService = Object.assign(
          {
            videoUrl: 'BBBBBB',
            highlights: 'BBBBBB',
            longDescription: 'BBBBBB',
            shortDescription: 'BBBBBB',
            whatInTheBox: 'BBBBBB',
            careInstructions: 'BBBBBB',
            productType: 'BBBBBB',
            modelName: 'BBBBBB',
            modelNumber: 'BBBBBB',
            fabricType: 'BBBBBB',
            specialFeatures: 'BBBBBB',
            productComplianceCertificate: 'BBBBBB',
            genuineAndLegal: true,
            countryOfOrigin: 'BBBBBB',
            usageAndSideEffects: 'BBBBBB',
            safetyWarnning: 'BBBBBB',
            warrantyPeriod: 'BBBBBB',
            warrantyPolicy: 'BBBBBB',
            dangerousGoods: 'BBBBBB',
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

      it('should return a list of ProductDocument', () => {
        const returnedFromService = Object.assign(
          {
            videoUrl: 'BBBBBB',
            highlights: 'BBBBBB',
            longDescription: 'BBBBBB',
            shortDescription: 'BBBBBB',
            whatInTheBox: 'BBBBBB',
            careInstructions: 'BBBBBB',
            productType: 'BBBBBB',
            modelName: 'BBBBBB',
            modelNumber: 'BBBBBB',
            fabricType: 'BBBBBB',
            specialFeatures: 'BBBBBB',
            productComplianceCertificate: 'BBBBBB',
            genuineAndLegal: true,
            countryOfOrigin: 'BBBBBB',
            usageAndSideEffects: 'BBBBBB',
            safetyWarnning: 'BBBBBB',
            warrantyPeriod: 'BBBBBB',
            warrantyPolicy: 'BBBBBB',
            dangerousGoods: 'BBBBBB',
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

      it('should delete a ProductDocument', () => {
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
