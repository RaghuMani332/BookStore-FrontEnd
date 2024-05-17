import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/Service/cartService/cart-service.service';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  templist!:any;
  flag:boolean=false
  cartList: any[] = []
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private cartService: CartServiceService,private dataservice:DataServiceService,public dialog: MatDialog,private route: Router,private router: ActivatedRoute) {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON)),
      iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN))
  }
  count!: number;
  ngOnInit(): void {


    this.router.params.subscribe(res1 => {
      this.flag=res1['flag']
      if(localStorage.getItem('authToken')==null||localStorage.getItem('authToken')=='')
        {
          this.dataservice.tempCartState.subscribe(res=>{this.cartList=res;console.log(res);
            // this.cartList=[...[...this.cartList]]
            console.log(this.cartList.flat());
            this.cartList=this.cartList.flat();
            console.log(this.cartList.flat());
            this.templist=this.cartList;
            
          })
        }
  
      
  
      this.cartService.getAllCartApiCall().subscribe(res => {
        this.cartList = res
        this.cartList= this.cartList.filter(ele=>{if(ele.quantity>0 && !ele.isUnCarted && !ele.isOrdered) return ele;})
          console.log(this.cartList);
        if(this.flag==true)
        {
          this.cartList.filter(e=>{
            for (let index = 0; index < this.templist.length; index++) {
              if(e.bookId==this.templist[index])
                {
                  e.quantity=e.quantity+this.templist[index].quantity;
                  this.cartService.updateQuantityToCartApiCall(e.cartId, e.quantity).subscribe(res => console.log(res))
                  this.templist[index]={};
                }
              
            }
            for (let index = 0; index < this.templist.length; index++) {
              
                  // e.quantity=e.quantity+this.templist[index].quantity;
                  this.cartService.addToCartApiCall({quantity:1,bookId:this.templist.bookId}).subscribe(res => console.log(res))  
            }
  
  
          })
          this.cartService.getAllCartApiCall().subscribe(res => {
            this.cartList = res
            this.cartList= this.cartList.filter(ele=>{if(ele.quantity>0 && !ele.isUnCarted && !ele.isOrdered) return ele;})
              console.log(this.cartList);
          })
        }
      },err=>console.log(err)
      )
      
    })


    // if(localStorage.getItem('authToken')==null||localStorage.getItem('authToken')=='')
    //   {
    //     this.dataservice.tempCartState.subscribe(res=>{this.cartList=res;console.log(res);
    //       // this.cartList=[...[...this.cartList]]
    //       console.log(this.cartList.flat());
    //       this.cartList=this.cartList.flat();
    //       console.log(this.cartList.flat());
    //       this.templist=this.cartList;
          
    //     })
    //   }

    

    // this.cartService.getAllCartApiCall().subscribe(res => {
    //   this.cartList = res
    //   this.cartList= this.cartList.filter(ele=>{if(ele.quantity>0 && !ele.isUnCarted && !ele.isOrdered) return ele;})
    //     console.log(this.cartList);
    // })
    // if(this.flag)
    //   {
    //     this.cartList.filter(e=>{
    //       for (let index = 0; index < this.templist.length; index++) {
    //         if(e.bookId==this.templist[index])
    //           {
    //             e.quantity=e.quantity+this.templist[index].quantity;
    //             this.cartService.updateQuantityToCartApiCall(e.cartId, e.quantity).subscribe(res => console.log(res))
    //             this.templist[index]={};
    //           }
            
    //       }
    //       for (let index = 0; index < this.templist.length; index++) {
            
    //             // e.quantity=e.quantity+this.templist[index].quantity;
    //             this.cartService.addToCartApiCall({quantity:1,bookId:this.templist.bookId}).subscribe(res => console.log(res))  
    //       }


    //     })
    //     this.cartService.getAllCartApiCall().subscribe(res => {
    //       this.cartList = res
    //       this.cartList= this.cartList.filter(ele=>{if(ele.quantity>0 && !ele.isUnCarted && !ele.isOrdered) return ele;})
    //         console.log(this.cartList);
    //     })
    //   }
      
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
    for (let i = 0; i < this.cartList.length; i++) {
      if (this.cartList[i].cartId == cart.cartId) {
        this.cartList[i].quantity = this.count;


        this.cartService.updateQuantityToCartApiCall(cart.cartId, this.count).subscribe(res => console.log(res))
      }

    }

  }
  clearCart(data:any)
  {
    this.cartService.unCartItem(data.cartId).subscribe(res=>{
      this.cartList= this.cartList.filter(ele=>{if(ele.cartId!=data.cartId) return ele;})
    },err=>{this.dataservice.clearLocalCart(data); 
      this.cartList= this.cartList.filter(ele=>{if(ele.cartId==data.cartId) return ele;})})

  }
  handlePlaceOrder(data:any,choice?:string)
  {
    if(localStorage.getItem('authToken')!=null)
      {
        this.dataservice.changeOrderBookState(data);
        this.route.navigate(['/customerDetails',data.cartId])
      }
      else{
        this.openDialog(choice)

      }

  }
  openDialog(choice:any) {
    this.dialog.open(LoginComponent,{data:{val:choice}});
  }

}
