import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceService } from 'src/app/Service/cartService/cart-service.service';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { HttpserviceService } from 'src/app/Service/httpService/httpservice.service';
import { DROP_DOWN, LOCATION_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  
  @Input() cartId!:Number;
  @Output() orderaddress=new EventEmitter<any>();

  cartList!: any;
  order: boolean = true;
  editaddress: boolean = true;
  editadd: any = {};
  addressList: any[] = [];
  addressForm!: FormGroup;
  // orderaddress: any;
  orderId! : number;
  emptyAddress: any = { 
    addressId: null,
    name: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    type: ''
  };

  constructor(
    private fb: FormBuilder,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private cartService: CartServiceService,
    private route: ActivatedRoute,
    private dataService: DataServiceService,
    private httpService: HttpserviceService,
    private router:Router
  ) {
    iconRegistry.addSvgIconLiteral("location-icon", sanitizer.bypassSecurityTrustHtml(LOCATION_ICON));
    iconRegistry.addSvgIconLiteral("drop-down-icon", sanitizer.bypassSecurityTrustHtml(DROP_DOWN));
  }

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != null) {
      this.cartService.getAllCartApiCall().subscribe(result1 => {
        this.cartList = result1.data
        this.cartList= this.cartList.filter((ele:any)=>{if(ele.quantity>0 && !ele.isUnCarted && !ele.isOrdered) return ele;})
          console.log(this.cartList);
        
        // this.route.params.subscribe((result2) => {
        //   this.cartList = result1.filter((e: any) => e.cartId == result2['cartId'])[0];
        //   this.loadAddresses();

        // });

        
          this.cartList = result1.data.filter((e: any) => e.cartId == this.cartId)   
          this.loadAddresses();
      });
    }
     else {
      this.route.params.subscribe((result2) => {
        this.cartList = this.cartService.getAllCartApiCall().subscribe(res=>{
        return res.data.filter((e: any) => e.cartId == result2['cartId'])[0];
        })
      });
    }

    this.addressForm = this.fb.group({
      name: [this.emptyAddress.name, Validators.required],
      mobileNumber: [this.emptyAddress.mobileNumber, [Validators.required, Validators.pattern('[0-9]{10}')]],
      address: [this.emptyAddress.address, Validators.required],
      city: [this.emptyAddress.city, Validators.required],
      state: [this.emptyAddress.state, Validators.required],
      type: [this.emptyAddress.type, Validators.required]
    });
  }

  loadAddresses() {
    this.httpService.getAddress().subscribe(res => {
      this.addressList = res.data;
    });
  }

  handleaddress() {
    // this.editaddress = false;
    if (this.addressForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const userData = this.addressForm.value;

    if (this.editadd && this.editadd.addressId) {
      this.httpService.updatAddress(userData,this.editadd.addressId).subscribe(
        (res:any) => {
          console.log(res.data);
          this.loadAddresses();
        },
        (err:any) => console.log(err)
      );
    } else {
      console.log(userData);
      
      this.httpService.addAddress(userData).subscribe(
        res => {console.log(res);
          this.loadAddresses();
        },
        err => console.log(err)
      );
    }
    this.editaddress = true;
  }

  orderAddress(address: any) {
    this.order = false;
    // this.orderaddress = address;
    this.orderaddress.emit({address:address,orderState:false})
    console.log(this.cartList);
    
    console.log(this.orderaddress);
  }


  orderSummery() {
    this.order = false;
  }

  editAddress(address: any) {
    this.editaddress = false;
    this.editadd = address;
    this.addressForm.patchValue({
      // addressId:address.addressId,
      name: address.name,
      mobileNumber: address.mobileNumber,
      address: address.address,
      city: address.city,
      state: address.state,
      type: address.type,
      userId:address.userId
    });
  }

  removeAddress(addressId: number) {
    this.httpService.removeAddress(addressId).subscribe(res => {
      this.loadAddresses();
    });
  }

  // handleOrder() {
  //   const orderDate = new Date().toISOString().slice(0, 10);
  //   const orderBody = {
  //     addressId: this.orderaddress.addressId,
  //     orderDate: orderDate,
  //     bookId: this.cartList.bookId
  //   };
  //   this.httpService.addOrder(orderBody).subscribe(res => {
  //     this.orderId = res[0];
  //     console.log(this.orderId);
  //     this.httpService.unCartItem(this.cartList.cartId).subscribe(() => {
  //       this.router.navigate([`orderPlaced`, this.orderId]);
  //     }, err => {
  //       console.error('Error removing cart', err);
  //     });
  //   }, err => {
  //     console.error('Error adding order', err);
  //   });
  // }

}
