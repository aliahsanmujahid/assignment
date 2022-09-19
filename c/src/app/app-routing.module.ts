import { AuthComponent } from './components/auth/auth.component';

import { AdminGuard } from './_guards/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {path: '',  component: ProfileComponent},
  {path: 'auth',  component: AuthComponent},
  {path: 'profile',  component: ProfileComponent},
  {path: 'product',  component: ProductComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
