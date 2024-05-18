import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartServiceService } from 'src/app/Service/cartService/cart-service.service';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { Book } from 'src/assets/BookObjectInterface';
import { HEART_ICON, STAR_ICON, STAR_ICON_BLACK, STAR_ICON_YELLOW } from 'src/assets/svg-icons';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.scss']
})
export class BookdetailsComponent implements OnInit, OnDestroy {

  book: any = [];


  bookId!: number

  count: number = 1;
  bookCount: boolean = false;
  Selectedbook!: Book
  cartId!: number;
  tempcart: any[] = [];
  subscription: Subscription = new Subscription();
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private dataservice: DataServiceService, private cartservice: CartServiceService, private route: ActivatedRoute) {
    iconRegistry.addSvgIconLiteral("heart-icon", sanitizer.bypassSecurityTrustHtml(HEART_ICON)),
      iconRegistry.addSvgIconLiteral("star_icon", sanitizer.bypassSecurityTrustHtml(STAR_ICON)),
      iconRegistry.addSvgIconLiteral("star_icon_black", sanitizer.bypassSecurityTrustHtml(STAR_ICON_BLACK)),
      iconRegistry.addSvgIconLiteral("star_icon_yellow", sanitizer.bypassSecurityTrustHtml(STAR_ICON_YELLOW))

  }

  ngOnInit(): void {

    this.subscription = this.dataservice.allBookState.subscribe(res1 => {
      console.log(res1);
      this.route.params.subscribe(res2 => {
        this.Selectedbook = res1.filter(e => e.bookId == res2['bookId'])[0]
      })
    })



    this.cartservice.getAllCartApiCall().subscribe(res => {
      this.book = res.filter((e: any) => e.bookId == this.Selectedbook.bookId)
      console.log(this.book);

      for (let i = 0; i < this.book.length; i++) {
        if (!this.book[i].isUnCarted && !this.book[i].isOrdered) {
          this.bookCount = true;
          this.count = this.book[i].quantity;
          this.cartId = this.book[i].cartId;
        }

      }
    })
    if (localStorage.getItem('authToken') == null) {
      this.dataservice.tempCartState.subscribe(res => 
        {
        const flatRes = res.flat();
        let found = false;
        for (let i = 0; i < flatRes.length; i++) {
          const ele = flatRes[i];
          if (this.Selectedbook.bookId === ele.bookId) 
            {
            found = true;
            this.count = ele.quantity
            this.bookCount = true;
          }
        }
      })
    }
  }



  handlecount(data: string, cart?: any) {
    if (data == "add") {
      this.count++;
    }
    else if (data == "minus") {
      if (this.count > 1)
        this.count--;
      else
        this.count = 1
    }
    this.cartservice.updateQuantityToCartApiCall(this.cartId, this.count).subscribe(res => console.log(res), err => 
      {
      for (let i = 0; i < this.tempcart.length; i++) 
        {
        const ele = this.tempcart[i];
        if (this.Selectedbook.bookId === ele.bookId) 
          {
          this.tempcart[i].quantity = this.count;
          this.dataservice.changeTempCart([...this.tempcart]);
        }
      }
      //----------
      this.tempcart[0].quantity = this.count;
      this.dataservice.changeTempCart([...this.tempcart]);
    }
    )
  }

  handleAddBook(data: any) {
    this.bookCount = !this.bookCount
    this.cartservice.addToCartApiCall({ quantity: 1, bookId: data.bookId }).subscribe(res => this.cartId = res, err => {
      this.tempcart[this.tempcart.length] = data;
      this.tempcart[0].quantity = 1;
      this.dataservice.changeTempCart(this.tempcart);
    });
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
