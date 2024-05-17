import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookcontainerComponent } from './Component/bookcontainer/bookcontainer.component';
import { BookdetailsComponent } from './Component/bookdetails/bookdetails.component';
import { CartComponent } from './Component/cart/cart.component';
import { CustomerDetailsComponent } from './Component/customer-details/customer-details.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { LoginComponent } from './Component/login/login.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"",
    component:DashboardComponent,
    children:[{
      path:'',
      component:BookcontainerComponent
    },
    {
      path:`bookDetail/:bookId`,
      component:BookdetailsComponent
    },
    {
      path:'cart/:flag',
      component:CartComponent
    },
    {
      path:'customerDetails/:cartId',
      component:CustomerDetailsComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
