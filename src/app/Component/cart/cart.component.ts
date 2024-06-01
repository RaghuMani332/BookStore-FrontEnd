import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/Service/cartService/cart-service.service';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { HttpserviceService } from 'src/app/Service/httpService/httpservice.service';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {



  order: boolean = true;
  orderaddress:any;

  dataCartId!:number

  templist!:any;
  addressDetails:boolean=true;
  flag:boolean=false
  cartList: any[] = []
  orderId: any;

  
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private cartService: CartServiceService,private dataservice:DataServiceService,public dialog: MatDialog,private route: Router,private router: ActivatedRoute,private httpservice:HttpserviceService) {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON)),
      iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN))
  }
  count!: number;
  ngOnInit(): void {


this.dataservice.changeHeaderDataState('MyCart');


    this.router.params.subscribe(res1 => {
      this.flag=res1['flag']
          })   
    if(localStorage.getItem('authToken')==null||localStorage.getItem('authToken')=='')
      {
        this.dataservice.tempCartState.subscribe(res=>{this.cartList=res;console.log(res);
          // this.cartList=[...[...this.cartList]]
          console.log(this.cartList.flat());
          this.cartList=this.cartList.flat();
          console.log(this.cartList.flat());
          this.templist=this.cartList;
          
        })


        //---------------
        
        //----------------
      }

    

    this.cartService.getAllCartApiCall().subscribe(res => {
      this.cartList = res.data
      this.cartList= this.cartList.filter(ele=>{if(ele.quantity>0 && !ele.isUnCarted && !ele.isOrdered) return ele;})
        console.log(this.cartList);
    })
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
  
      const ele = this.cartList[i];
        if (cart.bookId === ele.bookId) 
          {
          this.cartList[i].quantity = this.count;
          this.dataservice.changeTempCart([...this.cartList]);


          this.cartService.updateQuantityToCartApiCall(cart.cartId, this.count).subscribe(
            res => console.log(res),
            err => console.error(err)
          );
        }

    }
      this.dataservice.changeTempCart([...this.cartList]);

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
        // this.route.navigate(['/customerDetails',data.cartId])
        this.dataCartId=data.cartId;
        
        this.addressDetails=!this.addressDetails
       
      }
      else{
        this.openDialog('placeOrder',this.cartList,)
      }

  }
  openDialog(choice:any,cartitem:any) {
    this.dialog.open(LoginComponent,{data:{val:choice,cart:cartitem},width:"700px",height:"fit-content"});
  }


  SelectedAddress($event: any) {
    this.orderaddress=$event.address
    console.log(this.cartList);
    
    this.order=$event.orderState
    }

  handleOrder() {
    const orderDate = new Date().toISOString().slice(0, 10);
    for (let i = 0; i < this.cartList.length; i++) {
      const orderBody = {
        addressId: this.orderaddress.addressId,
        orderDate: orderDate,
        bookId: this.cartList[i].bookId
      };
      this.httpservice.addOrder(orderBody).subscribe(res => {
        this.orderId = res.data[0];
        // console.log(this.orderId);
        this.httpservice.unCartItem(this.cartList[i].cartId).subscribe(() => {
          // this.route.navigate([`orderPlaced`, this.orderId]);
        }, err => {
          console.error('Error removing cart', err);
        });
      }, err => {
        console.error('Error adding order', err);
      });
      
    }
    this.route.navigate([`orderPlaced`]);
    // const orderBody = {
    //   addressId: this.orderaddress.addressId,
    //   orderDate: orderDate,
    //   bookId: this.cartList.bookId
    // };
    // this.httpService.addOrder(orderBody).subscribe(res => {
    //   this.orderId = res[0];
    //   console.log(this.orderId);
    //   this.httpService.unCartItem(this.cartList.cartId).subscribe(() => {
    //     this.router.navigate([`orderPlaced`, this.orderId]);
    //   }, err => {
    //     console.error('Error removing cart', err);
    //   });
    // }, err => {
    //   console.error('Error adding order', err);
    // });
  }

}
