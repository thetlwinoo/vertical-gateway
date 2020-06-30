import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VehicleTemperaturesService } from 'app/entities/vscommerce/vehicle-temperatures/vehicle-temperatures.service';
import { IVehicleTemperatures, VehicleTemperatures } from 'app/shared/model/vscommerce/vehicle-temperatures.model';

describe('Service Tests', () => {
  describe('VehicleTemperatures Service', () => {
    let injector: TestBed;
    let service: VehicleTemperaturesService;
    let httpMock: HttpTestingController;
    let elemDefault: IVehicleTemperatures;
    let expectedResult: IVehicleTemperatures | IVehicleTemperatures[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(VehicleTemperaturesService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new VehicleTemperatures(0, 0, 'AAAAAAA', 0, 0, false, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a VehicleTemperatures', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new VehicleTemperatures()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a VehicleTemperatures', () => {
        const returnedFromService = Object.assign(
          {
            vehicleRegistration: 1,
            chillerSensorNumber: 'BBBBBB',
            recordedWhen: 1,
            temperature: 1,
            isCompressed: true,
            fullSensorData: 'BBBBBB',
            compressedSensorData: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of VehicleTemperatures', () => {
        const returnedFromService = Object.assign(
          {
            vehicleRegistration: 1,
            chillerSensorNumber: 'BBBBBB',
            recordedWhen: 1,
            temperature: 1,
            isCompressed: true,
            fullSensorData: 'BBBBBB',
            compressedSensorData: 'BBBBBB',
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

      it('should delete a VehicleTemperatures', () => {
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
