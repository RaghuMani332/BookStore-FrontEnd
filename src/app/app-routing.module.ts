import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookcontainerComponent } from './Component/bookcontainer/bookcontainer.component';
import { BookdetailsComponent } from './Component/bookdetails/bookdetails.component';
import { CartComponent } from './Component/cart/cart.component';
import { CustomerDetailsComponent } from './Component/customer-details/customer-details.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { OrderListComponent } from './Component/order-list/order-list.component';
import { OrderPlacedComponent } from './Component/order-placed/order-placed.component';
import { WishListComponent } from './Component/wish-list/wish-list.component';

const routes: Routes = [
 
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
      path:'cart',
      component:CartComponent
    },
    {
      path:'customerDetails/:cartId',
      component:CustomerDetailsComponent
    },
    {
      path:'orders',
      component:OrderListComponent
    },
    {
      path:'wishList',
      component:WishListComponent
    },
    {
      path:'orderList',
      component:OrderListComponent
    },
    {
      path:'orderPlaced/:orderId',
      component:OrderPlacedComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
