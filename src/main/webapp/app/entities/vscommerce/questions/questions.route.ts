import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IQuestions, Questions } from 'app/shared/model/vscommerce/questions.model';
import { QuestionsService } from './questions.service';
import { QuestionsComponent } from './questions.component';
import { QuestionsDetailComponent } from './questions-detail.component';
import { QuestionsUpdateComponent } from './questions-update.component';

@Injectable({ providedIn: 'root' })
export class QuestionsResolve implements Resolve<IQuestions> {
  constructor(private service: QuestionsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuestions> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((questions: HttpResponse<Questions>) => {
          if (questions.body) {
            return of(questions.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Questions());
  }
}

export const questionsRoute: Routes = [
  {
    path: '',
    component: QuestionsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceQuestions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuestionsDetailComponent,
    resolve: {
      questions: QuestionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceQuestions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuestionsUpdateComponent,
    resolve: {
      questions: QuestionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceQuestions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuestionsUpdateComponent,
    resolve: {
      questions: QuestionsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.vscommerceQuestions.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
