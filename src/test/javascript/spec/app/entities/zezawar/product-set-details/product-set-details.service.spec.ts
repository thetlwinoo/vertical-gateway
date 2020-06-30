import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductSetDetailsService } from 'app/entities/zezawar/product-set-details/product-set-details.service';
import { IProductSetDetails, ProductSetDetails } from 'app/shared/model/zezawar/product-set-details.model';

describe('Service Tests', () => {
  describe('ProductSetDetails Service', () => {
    let injector: TestBed;
    let service: ProductSetDetailsService;
    let httpMock: HttpTestingController;
    let elemDefault: IProductSetDetails;
    let expectedResult: IProductSetDetails | IProductSetDetails[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProductSetDetailsService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ProductSetDetails(0, 0, 0, 0, 0, 0, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ProductSetDetails', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ProductSetDetails()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProductSetDetails', () => {
        const returnedFromService = Object.assign(
          {
            subGroupNo: 1,
            subGroupMinCount: 1,
            subGroupMinTotal: 1,
            minCount: 1,
            maxCount: 1,
            isOptional: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ProductSetDetails', () => {
        const returnedFromService = Object.assign(
          {
            subGroupNo: 1,
            subGroupMinCount: 1,
            subGroupMinTotal: 1,
            minCount: 1,
            maxCount: 1,
            isOptional: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ProductSetDetails', () => {
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
