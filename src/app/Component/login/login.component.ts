// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { HttpserviceService } from 'src/app/Service/httpService/httpservice.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {

//   loginForm!: FormGroup;
//   signupForm!: FormGroup;
//   loginSignupOpt:boolean=false;
//   username:string='';
//   pass:string='';
//   hide = true;

//   constructor(private httpservice:HttpserviceService) { }

//   ngOnInit(): void {
//   }
//   email = new FormControl('', [Validators.required, Validators.email]);

//   get signupControl() 
//   {
//    return this.signupForm.controls; 
//  }

//   getErrorMessage() {
//     if (this.email.hasError('required')) {
//       return 'You must enter a value';
//     }

//     return this.email.hasError('email') ? 'Not a valid email' : '';
//   }


//   activeTab: string = 'login'; 

//   setActiveTab(tab: string) {
//     this.activeTab = tab;
//   }










//   loginmeth()
//   {
//     this.httpservice.login(this.username,this.pass).subscribe(res=>localStorage.setItem('authToken',res.data))

//   }
//   onNoClick(): void {
//     // this.dialogRef.close();
//   }
// goToLogin(){
// //  this.login=true;
// }
// goToSignUp(){
// //  this.login=false;
// }

// }
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/Service/httpService/httpservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  signupForm!: FormGroup;
  loginSignupOpt:boolean = false;
  hide = true;

  constructor(private httpservice: HttpserviceService, private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: {val: string},private route:Router,public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
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
    return '';
  }

  activeTab: string = 'login';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  login() {

    this.dialogRef.close();
    const { username, password } = this.loginForm.value;
    this.httpservice.login(username, password).subscribe(res =>{
       localStorage.setItem('authToken', res.data)
       
      // this.route.navigate([''])


        if(this.data.val!='placeOrder')
        {
          window.location.reload();
        }
        // this.dialogRef.close();

      });
    
  }

  signupmeth() {
    if (this.signupForm.valid) {
      const { fullName, email, password, mobileNumber } = this.signupForm.value;
      // Implement the signup API call
      // this.httpservice.signup({ fullName, email, password, mobileNumber }).subscribe(res => {
      //   console.log('Signup successful');
      //   // Handle post-signup actions
      // });
      console.log(fullName, email, password, mobileNumber);
      
    }
  }

  
  
  goToLogin() {
    this.activeTab = 'login';
  }

  goToSignUp() {
    this.activeTab = 'signup';
  }
  // loginmeth()
  // {
  //   this.httpservice.login('raghum11154@gmail.com', 'Raghu@1234').subscribe(res =>{
  //     localStorage.setItem('authToken', res.data)
  //    //  console.log(...this.data.name);
  //     console.log(this.data);
  //     console.log(this.data.val);
      
      
      
  //     if(this.data.val=='placeOrder')
  //      {
        
  //        this.route.navigate(['/cart'])
  //      }
  //    });
   
  // }
}
