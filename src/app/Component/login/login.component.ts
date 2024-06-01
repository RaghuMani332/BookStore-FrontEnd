
// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { CartServiceService } from 'src/app/Service/cartService/cart-service.service';
// import { HttpserviceService } from 'src/app/Service/httpService/httpservice.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   templist:any;
//   cartList:any;

//   loginForm!: FormGroup;
//   signupForm!: FormGroup;
//   loginSignupOpt:boolean = false;
//   hide = true;
  

//   constructor(private httpservice: HttpserviceService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: {val: string,cart:any},private route:Router,public dialogRef: MatDialogRef<LoginComponent>,private cartService:CartServiceService) { }

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required,Validators.email],
//       password: ['', Validators.required]

      
//     });

//     this.signupForm = this.fb.group({
//       fullName: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
//     });
//   }

//   get signupControl() {
//     return this.signupForm.controls;
//   }

//   getErrorMessage(controlName: string) {
//     const control = this.signupForm.get(controlName);
//     if (control?.hasError('required')) {
//       return 'You must enter a value';
//     }
//     if (controlName === 'email' && control?.hasError('email')) {
//       return 'Not a valid email';
//     }
//     if (controlName === 'mobileNumber' && control?.hasError('pattern')) {
//       return 'Invalid mobile number';
//     }
//     if (controlName === 'username' && control?.hasError('username')) {
//       return 'Not a valid emailr';
//     }
//     return '';
//   }

//   activeTab: string = 'login';

//   setActiveTab(tab: string) {
//     this.activeTab = tab;
//   }

//   login() {

    
//     this.dialogRef.close();
//     const { username, password } = this.loginForm.value;
//     this.httpservice.login(username, password).subscribe(res =>{
//        localStorage.setItem('authToken', res.data)
//        localStorage.setItem('name',res.name)
       


//         if(this.data.val=='placeOrder')
//         {
//           this.cartList=this.data.cart;
//           this.templist=this.cartList;
//           console.log(this.templist);
           
//             var v=localStorage.getItem('authToken')+'';
            
//             this.cartService.getAllCartApiCallThroughToken(v).subscribe(res => {
//               this.cartList = res.data
//               this.cartList= this.cartList.filter((ele:any)=>{if(ele.quantity>0 && !ele.isUnCarted && !ele.isOrdered) return ele;})
//                 console.log(this.cartList);
    
//               console.log(this.updateCart(this.templist,this.cartList,localStorage.getItem('authToken')));
//               window.location.reload()
//             },err=>console.log(err)
//           )
//           // window.location.reload();
//         }

//       });
    
//   }
//   updateCart(a: any, b: any,token?:any) {
//     for (const itemA of a) {
//       const itemB = b.find((item:any) => item.bookId === itemA.bookId);
//       if (itemB) {
//           itemB.quantity += itemA.quantity;
//           this.cartService.updateQuantityToCartApiCall(itemB.cartId,itemB.quantity,token).subscribe(res=>console.log(res.data)
//         )

//       } else {
//           b.push(itemA);
//           this.cartService.addToCartApiCall({bookId:itemA.bookId,quantity:itemA.quantity},token).subscribe(res=>console.log(res.data)
//           )
//       }
//   }
//   return b;
// }

//   signupmeth() {
//     if (this.signupForm.valid) {
//       const { fullName, email, password, mobileNumber } = this.signupForm.value;
//       // Implement the signup API call
//       // this.httpservice.signup({ fullName, email, password, mobileNumber }).subscribe(res => {
//       //   console.log('Signup successful');
//       //   // Handle post-signup actions
//       // });
//       console.log(fullName, email, password, mobileNumber);
      
//     }
//   }

  
  
//   goToLogin() {
//     this.activeTab = 'login';
//   }

//   goToSignUp() {
//     this.activeTab = 'signup';
//   }
// }
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/Service/cartService/cart-service.service';
import { HttpserviceService } from 'src/app/Service/httpService/httpservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  templist: any;
  cartList: any;

  loginForm!: FormGroup;
  signupForm!: FormGroup;
  loginSignupOpt: boolean = false;
  hide = true;

  constructor(
    private httpservice: HttpserviceService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { val: string, cart: any },
    private route: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
    private cartService: CartServiceService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  get signupControl() {
    return this.signupForm.controls;
  }

  getErrorMessage(controlName: string) {
    const control = this.signupForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (controlName === 'email' && control?.hasError('email')) {
      return 'Not a valid email';
    }
    if (controlName === 'mobileNumber' && control?.hasError('pattern')) {
      return 'Invalid mobile number';
    }
    if (controlName === 'username' && control?.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  activeTab: string = 'login';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  login() {
    const { username, password } = this.loginForm.value;
    this.httpservice.login(username, password).subscribe(
      res => {
        localStorage.setItem('authToken', res.data);
        localStorage.setItem('name', res.name);

        
        if (this.data!=null && this.data.val === 'placeOrder') {
          this.cartList = this.data.cart;
          this.templist = this.cartList;

          const authToken = localStorage.getItem('authToken') || '';

          this.cartService.getAllCartApiCallThroughToken(authToken).subscribe(
            res => {
              this.cartList = res.data.filter((ele: any) => ele.quantity > 0 && !ele.isUnCarted && !ele.isOrdered);
              this.updateCart(this.templist, this.cartList, authToken);
              window.location.reload();
            },
            err => console.error(err)
          );
        }
        if(this.data==null){
        this.dialogRef.close();
        window.location.reload();
        }

      },
      err => console.error('Login failed', err)
    );
  
  }

  updateCart(a: any, b: any, token?: any) {
    for (const itemA of a) {
      const itemB = b.find((item: any) => item.bookId === itemA.bookId);
      if (itemB) {
        itemB.quantity += itemA.quantity;
        this.cartService.updateQuantityToCartApiCall(itemB.cartId, itemB.quantity, token).subscribe(
          res => console.log(res.data),
          err => console.error('Failed to update quantity', err)
        );
      } else {
        b.push(itemA);
        this.cartService.addToCartApiCall({ bookId: itemA.bookId, quantity: itemA.quantity }, token).subscribe(
          res => console.log(res.data),
          err => console.error('Failed to add to cart', err)
        );
      }
    }
    return b;
  }

  signupmeth() {
    // if (this.signupForm.valid) {
    //   const { fullName, email, password, mobileNumber } = this.signupForm.value;
    //   this.httpservice.signup({ fullName, email, password, mobileNumber }).subscribe(
    //     res => {
    //       console.log('Signup successful');
    //       // Handle post-signup actions
    //     },
    //     (err:any) => console.error('Signup failed', err)
    //   );
    // }
  }

  goToLogin() {
    this.activeTab = 'login';
  }

  goToSignUp() {
    this.activeTab = 'signup';
  }
}
