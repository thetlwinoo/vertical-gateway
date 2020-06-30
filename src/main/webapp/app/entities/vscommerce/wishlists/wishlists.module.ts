import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { WishlistsComponent } from './wishlists.component';
import { WishlistsDetailComponent } from './wishlists-detail.component';
import { WishlistsUpdateComponent } from './wishlists-update.component';
import { WishlistsDeleteDialogComponent } from './wishlists-delete-dialog.component';
import { wishlistsRoute } from './wishlists.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(wishlistsRoute)],
  declarations: [WishlistsComponent, WishlistsDetailComponent, WishlistsUpdateComponent, WishlistsDeleteDialogComponent],
  entryComponents: [WishlistsDeleteDialogComponent],
})
export class VscommerceWishlistsModule {}
