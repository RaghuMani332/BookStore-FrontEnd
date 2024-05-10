import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookComponent } from './Component/book/book.component';
import { BookcontainerComponent } from './Component/bookcontainer/bookcontainer.component';
import { BookdetailsComponent } from './Component/bookdetails/bookdetails.component';
import { CartComponent } from './Component/cart/cart.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { HeaderComponent } from './Component/header/header.component';
import { LoginComponent } from './Component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookComponent,
    DashboardComponent,
    BookcontainerComponent,
    BookdetailsComponent,
    CartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
