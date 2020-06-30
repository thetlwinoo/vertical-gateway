import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddressesService } from 'app/entities/vscommerce/addresses/addresses.service';
import { IAddresses, Addresses } from 'app/shared/model/vscommerce/addresses.model';

describe('Service Tests', () => {
  describe('Addresses Service', () => {
    let injector: TestBed;
    let service: AddressesService;
    let httpMock: HttpTestingController;
    let elemDefault: IAddresses;
    let expectedResult: IAddresses | IAddresses[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AddressesService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Addresses(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Addresses', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Addresses()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Addresses', () => {
        const returnedFromService = Object.assign(
          {
            contactPerson: 'BBBBBB',
            contactNumber: 'BBBBBB',
            contactEmailAddress: 'BBBBBB',
            addressLine1: 'BBBBBB',
            addressLine2: 'BBBBBB',
            city: 'BBBBBB',
            postalCode: 'BBBBBB',
            defaultInd: true,
            activeInd: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Addresses', () => {
        const returnedFromService = Object.assign(
          {
            contactPerson: 'BBBBBB',
            contactNumber: 'BBBBBB',
            contactEmailAddress: 'BBBBBB',
            addressLine1: 'BBBBBB',
            addressLine2: 'BBBBBB',
            city: 'BBBBBB',
            postalCode: 'BBBBBB',
            defaultInd: true,
            activeInd: true,
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

      it('should delete a Addresses', () => {
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
