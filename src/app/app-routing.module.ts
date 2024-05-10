import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookcontainerComponent } from './Component/bookcontainer/bookcontainer.component';
import { BookdetailsComponent } from './Component/bookdetails/bookdetails.component';
import { CartComponent } from './Component/cart/cart.component';
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
      path:'bookDetail',
      component:BookdetailsComponent
    },
    {
      path:'cart',
      component:CartComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
