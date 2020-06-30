import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { QuestionsService } from 'app/entities/vscommerce/questions/questions.service';
import { IQuestions, Questions } from 'app/shared/model/vscommerce/questions.model';

describe('Service Tests', () => {
  describe('Questions Service', () => {
    let injector: TestBed;
    let service: QuestionsService;
    let httpMock: HttpTestingController;
    let elemDefault: IQuestions;
    let expectedResult: IQuestions | IQuestions[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(QuestionsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Questions(0, 'AAAAAAA', currentDate, 'AAAAAAA', currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            customerQuestionOn: currentDate.format(DATE_TIME_FORMAT),
            supplierAnswerOn: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Questions', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            customerQuestionOn: currentDate.format(DATE_TIME_FORMAT),
            supplierAnswerOn: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            customerQuestionOn: currentDate,
            supplierAnswerOn: currentDate,
          },
          returnedFromService
        );

        service.create(new Questions()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Questions', () => {
        const returnedFromService = Object.assign(
          {
            customerQuestion: 'BBBBBB',
            customerQuestionOn: currentDate.format(DATE_TIME_FORMAT),
            supplierAnswer: 'BBBBBB',
            supplierAnswerOn: currentDate.format(DATE_TIME_FORMAT),
            activeInd: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            customerQuestionOn: currentDate,
            supplierAnswerOn: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Questions', () => {
        const returnedFromService = Object.assign(
          {
            customerQuestion: 'BBBBBB',
            customerQuestionOn: currentDate.format(DATE_TIME_FORMAT),
            supplierAnswer: 'BBBBBB',
            supplierAnswerOn: currentDate.format(DATE_TIME_FORMAT),
            activeInd: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            customerQuestionOn: currentDate,
            supplierAnswerOn: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Questions', () => {
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
