import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ColdRoomTemperaturesService } from 'app/entities/zezawar/cold-room-temperatures/cold-room-temperatures.service';
import { IColdRoomTemperatures, ColdRoomTemperatures } from 'app/shared/model/zezawar/cold-room-temperatures.model';

describe('Service Tests', () => {
  describe('ColdRoomTemperatures Service', () => {
    let injector: TestBed;
    let service: ColdRoomTemperaturesService;
    let httpMock: HttpTestingController;
    let elemDefault: IColdRoomTemperatures;
    let expectedResult: IColdRoomTemperatures | IColdRoomTemperatures[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ColdRoomTemperaturesService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ColdRoomTemperatures(0, 0, currentDate, 0, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            recordedWhen: currentDate.format(DATE_TIME_FORMAT),
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ColdRoomTemperatures', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            recordedWhen: currentDate.format(DATE_TIME_FORMAT),
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            recordedWhen: currentDate,
            validFrom: currentDate,
            validTo: currentDate,
          },
          returnedFromService
        );

        service.create(new ColdRoomTemperatures()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ColdRoomTemperatures', () => {
        const returnedFromService = Object.assign(
          {
            coldRoomSensorNumber: 1,
            recordedWhen: currentDate.format(DATE_TIME_FORMAT),
            temperature: 1,
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            recordedWhen: currentDate,
            validFrom: currentDate,
            validTo: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ColdRoomTemperatures', () => {
        const returnedFromService = Object.assign(
          {
            coldRoomSensorNumber: 1,
            recordedWhen: currentDate.format(DATE_TIME_FORMAT),
            temperature: 1,
            validFrom: currentDate.format(DATE_TIME_FORMAT),
            validTo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            recordedWhen: currentDate,
            validFrom: currentDate,
            validTo: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ColdRoomTemperatures', () => {
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
