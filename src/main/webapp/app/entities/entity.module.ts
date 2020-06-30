import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'images',
        loadChildren: () => import('./cloudblob/images/images.module').then(m => m.CloudblobImagesModule),
      },
      {
        path: 'address-types',
        loadChildren: () => import('./vscommerce/address-types/address-types.module').then(m => m.VscommerceAddressTypesModule),
      },
      {
        path: 'culture',
        loadChildren: () => import('./vscommerce/culture/culture.module').then(m => m.VscommerceCultureModule),
      },
      {
        path: 'tax',
        loadChildren: () => import('./vscommerce/tax/tax.module').then(m => m.VscommerceTaxModule),
      },
      {
        path: 'tax-class',
        loadChildren: () => import('./vscommerce/tax-class/tax-class.module').then(m => m.VscommerceTaxClassModule),
      },
      {
        path: 'addresses',
        loadChildren: () => import('./vscommerce/addresses/addresses.module').then(m => m.VscommerceAddressesModule),
      },
      {
        path: 'business-entity-address',
        loadChildren: () =>
          import('./vscommerce/business-entity-address/business-entity-address.module').then(m => m.VscommerceBusinessEntityAddressModule),
      },
      {
        path: 'business-entity-contact',
        loadChildren: () =>
          import('./vscommerce/business-entity-contact/business-entity-contact.module').then(m => m.VscommerceBusinessEntityContactModule),
      },
      {
        path: 'person-email-address',
        loadChildren: () =>
          import('./vscommerce/person-email-address/person-email-address.module').then(m => m.VscommercePersonEmailAddressModule),
      },
      {
        path: 'person-phone',
        loadChildren: () => import('./vscommerce/person-phone/person-phone.module').then(m => m.VscommercePersonPhoneModule),
      },
      {
        path: 'phone-number-type',
        loadChildren: () => import('./vscommerce/phone-number-type/phone-number-type.module').then(m => m.VscommercePhoneNumberTypeModule),
      },
      {
        path: 'contact-type',
        loadChildren: () => import('./vscommerce/contact-type/contact-type.module').then(m => m.VscommerceContactTypeModule),
      },
      {
        path: 'countries',
        loadChildren: () => import('./vscommerce/countries/countries.module').then(m => m.VscommerceCountriesModule),
      },
      {
        path: 'state-provinces',
        loadChildren: () => import('./vscommerce/state-provinces/state-provinces.module').then(m => m.VscommerceStateProvincesModule),
      },
      {
        path: 'cities',
        loadChildren: () => import('./vscommerce/cities/cities.module').then(m => m.VscommerceCitiesModule),
      },
      {
        path: 'zone',
        loadChildren: () => import('./vscommerce/zone/zone.module').then(m => m.VscommerceZoneModule),
      },
      {
        path: 'system-parameters',
        loadChildren: () => import('./vscommerce/system-parameters/system-parameters.module').then(m => m.VscommerceSystemParametersModule),
      },
      {
        path: 'transaction-types',
        loadChildren: () => import('./vscommerce/transaction-types/transaction-types.module').then(m => m.VscommerceTransactionTypesModule),
      },
      {
        path: 'people',
        loadChildren: () => import('./vscommerce/people/people.module').then(m => m.VscommercePeopleModule),
      },
      {
        path: 'delivery-methods',
        loadChildren: () => import('./vscommerce/delivery-methods/delivery-methods.module').then(m => m.VscommerceDeliveryMethodsModule),
      },
      {
        path: 'supplier-categories',
        loadChildren: () =>
          import('./vscommerce/supplier-categories/supplier-categories.module').then(m => m.VscommerceSupplierCategoriesModule),
      },
      {
        path: 'suppliers',
        loadChildren: () => import('./vscommerce/suppliers/suppliers.module').then(m => m.VscommerceSuppliersModule),
      },
      {
        path: 'supplier-transactions',
        loadChildren: () =>
          import('./vscommerce/supplier-transactions/supplier-transactions.module').then(m => m.VscommerceSupplierTransactionsModule),
      },
      {
        path: 'supplier-transaction-status',
        loadChildren: () =>
          import('./vscommerce/supplier-transaction-status/supplier-transaction-status.module').then(
            m => m.VscommerceSupplierTransactionStatusModule
          ),
      },
      {
        path: 'currency-rate',
        loadChildren: () => import('./vscommerce/currency-rate/currency-rate.module').then(m => m.VscommerceCurrencyRateModule),
      },
      {
        path: 'purchase-orders',
        loadChildren: () => import('./vscommerce/purchase-orders/purchase-orders.module').then(m => m.VscommercePurchaseOrdersModule),
      },
      {
        path: 'purchase-order-lines',
        loadChildren: () =>
          import('./vscommerce/purchase-order-lines/purchase-order-lines.module').then(m => m.VscommercePurchaseOrderLinesModule),
      },
      {
        path: 'buying-groups',
        loadChildren: () => import('./vscommerce/buying-groups/buying-groups.module').then(m => m.VscommerceBuyingGroupsModule),
      },
      {
        path: 'customer-categories',
        loadChildren: () =>
          import('./vscommerce/customer-categories/customer-categories.module').then(m => m.VscommerceCustomerCategoriesModule),
      },
      {
        path: 'customers',
        loadChildren: () => import('./vscommerce/customers/customers.module').then(m => m.VscommerceCustomersModule),
      },
      {
        path: 'customer-payment',
        loadChildren: () => import('./vscommerce/customer-payment/customer-payment.module').then(m => m.VscommerceCustomerPaymentModule),
      },
      {
        path: 'customer-payment-credit-card',
        loadChildren: () =>
          import('./vscommerce/customer-payment-credit-card/customer-payment-credit-card.module').then(
            m => m.VscommerceCustomerPaymentCreditCardModule
          ),
      },
      {
        path: 'customer-payment-credit-card-extended',
        loadChildren: () =>
          import('./vscommerce/customer-payment-credit-card-extended/customer-payment-credit-card-extended.module').then(
            m => m.VscommerceCustomerPaymentCreditCardExtendedModule
          ),
      },
      {
        path: 'customer-payment-voucher',
        loadChildren: () =>
          import('./vscommerce/customer-payment-voucher/customer-payment-voucher.module').then(
            m => m.VscommerceCustomerPaymentVoucherModule
          ),
      },
      {
        path: 'customer-payment-bank-transfer',
        loadChildren: () =>
          import('./vscommerce/customer-payment-bank-transfer/customer-payment-bank-transfer.module').then(
            m => m.VscommerceCustomerPaymentBankTransferModule
          ),
      },
      {
        path: 'customer-payment-paypal',
        loadChildren: () =>
          import('./vscommerce/customer-payment-paypal/customer-payment-paypal.module').then(m => m.VscommerceCustomerPaymentPaypalModule),
      },
      {
        path: 'customer-transactions',
        loadChildren: () =>
          import('./vscommerce/customer-transactions/customer-transactions.module').then(m => m.VscommerceCustomerTransactionsModule),
      },
      {
        path: 'invoice-lines',
        loadChildren: () => import('./vscommerce/invoice-lines/invoice-lines.module').then(m => m.VscommerceInvoiceLinesModule),
      },
      {
        path: 'invoices',
        loadChildren: () => import('./vscommerce/invoices/invoices.module').then(m => m.VscommerceInvoicesModule),
      },
      {
        path: 'receipts',
        loadChildren: () => import('./vscommerce/receipts/receipts.module').then(m => m.VscommerceReceiptsModule),
      },
      {
        path: 'payment-methods',
        loadChildren: () => import('./vscommerce/payment-methods/payment-methods.module').then(m => m.VscommercePaymentMethodsModule),
      },
      {
        path: 'bank-accounts',
        loadChildren: () => import('./vscommerce/bank-accounts/bank-accounts.module').then(m => m.VscommerceBankAccountsModule),
      },
      {
        path: 'cards',
        loadChildren: () => import('./vscommerce/cards/cards.module').then(m => m.VscommerceCardsModule),
      },
      {
        path: 'card-type-credit-cards',
        loadChildren: () =>
          import('./vscommerce/card-type-credit-cards/card-type-credit-cards.module').then(m => m.VscommerceCardTypeCreditCardsModule),
      },
      {
        path: 'card-types',
        loadChildren: () => import('./vscommerce/card-types/card-types.module').then(m => m.VscommerceCardTypesModule),
      },
      {
        path: 'credit-card-type',
        loadChildren: () => import('./vscommerce/credit-card-type/credit-card-type.module').then(m => m.VscommerceCreditCardTypeModule),
      },
      {
        path: 'order-lines',
        loadChildren: () => import('./vscommerce/order-lines/order-lines.module').then(m => m.VscommerceOrderLinesModule),
      },
      {
        path: 'orders',
        loadChildren: () => import('./vscommerce/orders/orders.module').then(m => m.VscommerceOrdersModule),
      },
      {
        path: 'order-packages',
        loadChildren: () => import('./vscommerce/order-packages/order-packages.module').then(m => m.VscommerceOrderPackagesModule),
      },
      {
        path: 'order-tracking',
        loadChildren: () => import('./vscommerce/order-tracking/order-tracking.module').then(m => m.VscommerceOrderTrackingModule),
      },
      {
        path: 'tracking-event',
        loadChildren: () => import('./vscommerce/tracking-event/tracking-event.module').then(m => m.VscommerceTrackingEventModule),
      },
      {
        path: 'special-deals',
        loadChildren: () => import('./vscommerce/special-deals/special-deals.module').then(m => m.VscommerceSpecialDealsModule),
      },
      {
        path: 'discount-types',
        loadChildren: () => import('./vscommerce/discount-types/discount-types.module').then(m => m.VscommerceDiscountTypesModule),
      },
      {
        path: 'discount',
        loadChildren: () => import('./vscommerce/discount/discount.module').then(m => m.VscommerceDiscountModule),
      },
      {
        path: 'discount-details',
        loadChildren: () => import('./vscommerce/discount-details/discount-details.module').then(m => m.VscommerceDiscountDetailsModule),
      },
      {
        path: 'cold-room-temperatures',
        loadChildren: () =>
          import('./vscommerce/cold-room-temperatures/cold-room-temperatures.module').then(m => m.VscommerceColdRoomTemperaturesModule),
      },
      {
        path: 'package-types',
        loadChildren: () => import('./vscommerce/package-types/package-types.module').then(m => m.VscommercePackageTypesModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./vscommerce/products/products.module').then(m => m.VscommerceProductsModule),
      },
      {
        path: 'product-list-price-history',
        loadChildren: () =>
          import('./vscommerce/product-list-price-history/product-list-price-history.module').then(
            m => m.VscommerceProductListPriceHistoryModule
          ),
      },
      {
        path: 'barcode-types',
        loadChildren: () => import('./vscommerce/barcode-types/barcode-types.module').then(m => m.VscommerceBarcodeTypesModule),
      },
      {
        path: 'stock-items',
        loadChildren: () => import('./vscommerce/stock-items/stock-items.module').then(m => m.VscommerceStockItemsModule),
      },
      {
        path: 'upload-transactions',
        loadChildren: () =>
          import('./vscommerce/upload-transactions/upload-transactions.module').then(m => m.VscommerceUploadTransactionsModule),
      },
      {
        path: 'upload-action-types',
        loadChildren: () =>
          import('./vscommerce/upload-action-types/upload-action-types.module').then(m => m.VscommerceUploadActionTypesModule),
      },
      {
        path: 'stock-item-transactions',
        loadChildren: () =>
          import('./vscommerce/stock-item-transactions/stock-item-transactions.module').then(m => m.VscommerceStockItemTransactionsModule),
      },
      {
        path: 'warranty-types',
        loadChildren: () => import('./vscommerce/warranty-types/warranty-types.module').then(m => m.VscommerceWarrantyTypesModule),
      },
      {
        path: 'product-attribute',
        loadChildren: () => import('./vscommerce/product-attribute/product-attribute.module').then(m => m.VscommerceProductAttributeModule),
      },
      {
        path: 'product-attribute-set',
        loadChildren: () =>
          import('./vscommerce/product-attribute-set/product-attribute-set.module').then(m => m.VscommerceProductAttributeSetModule),
      },
      {
        path: 'product-option',
        loadChildren: () => import('./vscommerce/product-option/product-option.module').then(m => m.VscommerceProductOptionModule),
      },
      {
        path: 'product-option-set',
        loadChildren: () =>
          import('./vscommerce/product-option-set/product-option-set.module').then(m => m.VscommerceProductOptionSetModule),
      },
      {
        path: 'product-choice',
        loadChildren: () => import('./vscommerce/product-choice/product-choice.module').then(m => m.VscommerceProductChoiceModule),
      },
      {
        path: 'product-set',
        loadChildren: () => import('./vscommerce/product-set/product-set.module').then(m => m.VscommerceProductSetModule),
      },
      {
        path: 'product-set-details',
        loadChildren: () =>
          import('./vscommerce/product-set-details/product-set-details.module').then(m => m.VscommerceProductSetDetailsModule),
      },
      {
        path: 'product-set-detail-price',
        loadChildren: () =>
          import('./vscommerce/product-set-detail-price/product-set-detail-price.module').then(
            m => m.VscommerceProductSetDetailPriceModule
          ),
      },
      {
        path: 'product-document',
        loadChildren: () => import('./vscommerce/product-document/product-document.module').then(m => m.VscommerceProductDocumentModule),
      },
      {
        path: 'materials',
        loadChildren: () => import('./vscommerce/materials/materials.module').then(m => m.VscommerceMaterialsModule),
      },
      {
        path: 'product-brand',
        loadChildren: () => import('./vscommerce/product-brand/product-brand.module').then(m => m.VscommerceProductBrandModule),
      },
      {
        path: 'product-category',
        loadChildren: () => import('./vscommerce/product-category/product-category.module').then(m => m.VscommerceProductCategoryModule),
      },
      {
        path: 'campaign',
        loadChildren: () => import('./vscommerce/campaign/campaign.module').then(m => m.VscommerceCampaignModule),
      },
      {
        path: 'product-catalog',
        loadChildren: () => import('./vscommerce/product-catalog/product-catalog.module').then(m => m.VscommerceProductCatalogModule),
      },
      {
        path: 'currency',
        loadChildren: () => import('./vscommerce/currency/currency.module').then(m => m.VscommerceCurrencyModule),
      },
      {
        path: 'photos',
        loadChildren: () => import('./vscommerce/photos/photos.module').then(m => m.VscommercePhotosModule),
      },
      {
        path: 'unit-measure',
        loadChildren: () => import('./vscommerce/unit-measure/unit-measure.module').then(m => m.VscommerceUnitMeasureModule),
      },
      {
        path: 'vehicle-temperatures',
        loadChildren: () =>
          import('./vscommerce/vehicle-temperatures/vehicle-temperatures.module').then(m => m.VscommerceVehicleTemperaturesModule),
      },
      {
        path: 'shopping-carts',
        loadChildren: () => import('./vscommerce/shopping-carts/shopping-carts.module').then(m => m.VscommerceShoppingCartsModule),
      },
      {
        path: 'shopping-cart-items',
        loadChildren: () =>
          import('./vscommerce/shopping-cart-items/shopping-cart-items.module').then(m => m.VscommerceShoppingCartItemsModule),
      },
      {
        path: 'wishlists',
        loadChildren: () => import('./vscommerce/wishlists/wishlists.module').then(m => m.VscommerceWishlistsModule),
      },
      {
        path: 'wishlist-lines',
        loadChildren: () => import('./vscommerce/wishlist-lines/wishlist-lines.module').then(m => m.VscommerceWishlistLinesModule),
      },
      {
        path: 'compares',
        loadChildren: () => import('./vscommerce/compares/compares.module').then(m => m.VscommerceComparesModule),
      },
      {
        path: 'compare-lines',
        loadChildren: () => import('./vscommerce/compare-lines/compare-lines.module').then(m => m.VscommerceCompareLinesModule),
      },
      {
        path: 'questions',
        loadChildren: () => import('./vscommerce/questions/questions.module').then(m => m.VscommerceQuestionsModule),
      },
      {
        path: 'product-tags',
        loadChildren: () => import('./vscommerce/product-tags/product-tags.module').then(m => m.VscommerceProductTagsModule),
      },
      {
        path: 'logistics',
        loadChildren: () => import('./vscommerce/logistics/logistics.module').then(m => m.VscommerceLogisticsModule),
      },
      {
        path: 'shipping-fee-chart',
        loadChildren: () =>
          import('./vscommerce/shipping-fee-chart/shipping-fee-chart.module').then(m => m.VscommerceShippingFeeChartModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
