import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { CartComponent } from './cart/cart.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthguardService } from './services/authguard.service';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'category-listing', component: CategoryListingComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'user-orders', component: UserOrdersComponent },
  { path: 'add-new-product', component: AddNewProductComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'manage-orders', component: ManageOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
