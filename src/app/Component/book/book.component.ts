import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/Service/bookService/book-service.service';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { Book } from 'src/assets/BookObjectInterface';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  bookList!:Book[]
  constructor(private bookservice:BookServiceService,private dataservice:DataServiceService,private router:Router) { }

  ngOnInit(): void {
    this.bookservice.getAllBookApiCall().subscribe(res=>
      {
        this.bookList=res;
        console.log(this.bookList)
      },
    err=>console.log(err))
   
    
  }
  handleClick(data:Book)
  {
    this.dataservice.changeState(data);
    this.router.navigate(["/bookDetail"]);
  }

}
