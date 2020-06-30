import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { WishlistLinesComponent } from './wishlist-lines.component';
import { WishlistLinesDetailComponent } from './wishlist-lines-detail.component';
import { WishlistLinesUpdateComponent } from './wishlist-lines-update.component';
import { WishlistLinesDeleteDialogComponent } from './wishlist-lines-delete-dialog.component';
import { wishlistLinesRoute } from './wishlist-lines.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(wishlistLinesRoute)],
  declarations: [WishlistLinesComponent, WishlistLinesDetailComponent, WishlistLinesUpdateComponent, WishlistLinesDeleteDialogComponent],
  entryComponents: [WishlistLinesDeleteDialogComponent],
})
export class VscommerceWishlistLinesModule {}
