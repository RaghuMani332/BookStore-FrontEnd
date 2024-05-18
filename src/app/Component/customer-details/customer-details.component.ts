import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/Service/cartService/cart-service.service';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  count!: number;
  Book: any ;
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private cartService: CartServiceService,private dataservice:DataServiceService,public dialog: MatDialog,private route: Router,private activatedRoute:ActivatedRoute) {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON)),
      iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN))
  }

  ngOnInit(): void {
   this.cartService.getAllCartApiCall().subscribe(res=>{this.activatedRoute.params.subscribe(res2=>{this.Book=res.filter((e:any)=>e.cartId==res2['cartId'])[0]})}) 
  }
 

  
  handlecount(data: string, cart?: any) {
    this.count = cart.quantity;
    if (data == "add") {
      this.count++;
    }
    else if (data == "minus") {
      if (this.count > 1)
        this.count--;
      else
        this.count = 1
    }
    
      if (this.Book.cartId == cart.cartId) {
        this.Book.quantity = this.count;


        this.cartService.updateQuantityToCartApiCall(cart.cartId, this.count).subscribe(res => this.dataservice.changeOrderBookState(this.Book))
      

    }

  }
  clearCart(data:any)
  {
    this.cartService.unCartItem(data.cartId).subscribe(res=>{
      this.Book= this.Book=[]
      this.dataservice.changeOrderBookState(this.Book)
      this.route.navigate([''])
    })

  }
  

}
