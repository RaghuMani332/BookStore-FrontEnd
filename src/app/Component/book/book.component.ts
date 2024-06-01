import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookServiceService } from 'src/app/Service/bookService/book-service.service';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { Book } from 'src/assets/BookObjectInterface';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit,OnDestroy {

  subscription!:Subscription
  bookList!:Book[]
  constructor(private bookservice:BookServiceService,private dataservice:DataServiceService,private router:Router,private dataService:DataServiceService) { }

  ngOnInit(): void {
    this.subscription=this.dataService.allBookState.subscribe(res=>{this.bookList=res;console.log(this.bookList);
      this.dataService.changeHeaderDataState('Books');
    })
  }
    
  handleClick(data?:any)
  {
    // this.dataservice.changeState(data);
    console.log(this.bookList)
    console.log(data);
    
    this.router.navigate([`/bookDetail`,data.bookId]);
    console.log(this.bookList)
  }

  ngOnDestroy(): void {
    console.log(this.bookList)
    this.bookList=[]
    this.subscription.unsubscribe()
    console.log(this.bookList)
  }
}
