import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { Book } from 'src/assets/BookObjectInterface';
import { HEART_ICON, STAR_ICON, STAR_ICON_BLACK, STAR_ICON_YELLOW } from 'src/assets/svg-icons';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.scss']
})
export class BookdetailsComponent implements OnInit , OnDestroy{
  count:number=1;
  bookCount:boolean=false;
bookList!:Book
subscription:Subscription=new Subscription();
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,private dataservice:DataServiceService) {
    iconRegistry.addSvgIconLiteral("heart-icon", sanitizer.bypassSecurityTrustHtml(HEART_ICON)),
    iconRegistry.addSvgIconLiteral("star_icon",sanitizer.bypassSecurityTrustHtml(STAR_ICON)),
    iconRegistry.addSvgIconLiteral("star_icon_black",sanitizer.bypassSecurityTrustHtml(STAR_ICON_BLACK)),
    iconRegistry.addSvgIconLiteral("star_icon_yellow",sanitizer.bypassSecurityTrustHtml(STAR_ICON_YELLOW))
    
   }

  ngOnInit(): void {
    this.subscription=this.dataservice.currentState.subscribe(res=>this.bookList=res,err=>console.log(err)
    )
  }
  handlecount(data:string)
  {
    if(data=="add")
      {
        this.count++;
      }
      else if(data=="minus")
      {
          if(this.count>1)
          this.count--;
        else
        this.count=1
      }
  }

  handleAddBook(data:any)
  {
    this.bookCount=!this.bookCount
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
