import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { WishlistLinesUpdateComponent } from 'app/entities/zezawar/wishlist-lines/wishlist-lines-update.component';
import { WishlistLinesService } from 'app/entities/zezawar/wishlist-lines/wishlist-lines.service';
import { WishlistLines } from 'app/shared/model/zezawar/wishlist-lines.model';

describe('Component Tests', () => {
  describe('WishlistLines Management Update Component', () => {
    let comp: WishlistLinesUpdateComponent;
    let fixture: ComponentFixture<WishlistLinesUpdateComponent>;
    let service: WishlistLinesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [WishlistLinesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(WishlistLinesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(WishlistLinesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(WishlistLinesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new WishlistLines(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new WishlistLines();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
