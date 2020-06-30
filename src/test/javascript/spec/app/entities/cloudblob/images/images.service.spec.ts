import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImagesService } from 'app/entities/cloudblob/images/images.service';
import { IImages, Images } from 'app/shared/model/cloudblob/images.model';

describe('Service Tests', () => {
  describe('Images Service', () => {
    let injector: TestBed;
    let service: ImagesService;
    let httpMock: HttpTestingController;
    let elemDefault: IImages;
    let expectedResult: IImages | IImages[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ImagesService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Images(
        0,
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        0
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Images', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Images()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Images', () => {
        const returnedFromService = Object.assign(
          {
            thumbnail: 'BBBBBB',
            original: 'BBBBBB',
            bannerTall: 'BBBBBB',
            bannerWide: 'BBBBBB',
            circle: 'BBBBBB',
            sharpened: 'BBBBBB',
            square: 'BBBBBB',
            watermark: 'BBBBBB',
            refId: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Images', () => {
        const returnedFromService = Object.assign(
          {
            thumbnail: 'BBBBBB',
            original: 'BBBBBB',
            bannerTall: 'BBBBBB',
            bannerWide: 'BBBBBB',
            circle: 'BBBBBB',
            sharpened: 'BBBBBB',
            square: 'BBBBBB',
            watermark: 'BBBBBB',
            refId: 1,
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

      it('should delete a Images', () => {
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
