import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BookServiceService } from 'src/app/Service/bookService/book-service.service';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { UserServiceService } from 'src/app/Service/userService/user-service.service';
import { BOOK_ICON, CART_ICON, PROFILE_ICON, SEARCH_ICON } from 'src/assets/svg-icons';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  page:string='MyCart'
  userName!:string;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,public dialog: MatDialog,private bookservice:BookServiceService,private dataService:DataServiceService,private userService:UserServiceService) {
    iconRegistry.addSvgIconLiteral("book-icon", sanitizer.bypassSecurityTrustHtml(BOOK_ICON)),
    iconRegistry.addSvgIconLiteral("search-icon", sanitizer.bypassSecurityTrustHtml(SEARCH_ICON)),
    iconRegistry.addSvgIconLiteral("profile-icon", sanitizer.bypassSecurityTrustHtml(PROFILE_ICON)),
    iconRegistry.addSvgIconLiteral("cart-icon", sanitizer.bypassSecurityTrustHtml(CART_ICON))
   }

  ngOnInit(): void {
    if(localStorage.getItem('authToken'))
      {
        this.userService.getNameByTokenApiCall().subscribe(res=>{this.userName=res.data 
        })
      }
      else{
        this.userName='Profile'
      }
    this.bookservice.getAllBookApiCall().subscribe(res=>
      {
        this.dataService.changeAllBookList(res)
      },
    err=>console.log(err))
  }
  openDialog() {
    this.dialog.open(LoginComponent)
  }
  logout()
  {
    localStorage.clear();
  }
}
