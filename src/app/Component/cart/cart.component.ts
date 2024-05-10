import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CartServiceService } from 'src/app/Service/cartService/cart-service.service';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList:any=[]
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private cartService:CartServiceService) {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON)),
    iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN))
   }

  ngOnInit(): void {
    this.cartService.getAllCartApiCall().subscribe(res=>this.cartList=res)
  }


}
