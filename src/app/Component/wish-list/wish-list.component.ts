import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { WishListService } from 'src/app/Service/WishList/wish-list.service';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { DELETE_FOREVER_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  wishList:any;
  tempWishList:any;
  bookList:any;
  constructor( private domSanitizer: DomSanitizer,private matIconRegistry: MatIconRegistry,private wishListService:WishListService,private dataservice:DataServiceService) {
      matIconRegistry.addSvgIconLiteral("delete-icon", domSanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));

     }

  ngOnInit(): void {
    if(localStorage.getItem('authToken')!=null)
      {
    this.wishListService.getAllWishListApiCall().subscribe(res=>this.wishList=res)
      }
  }
  removeWishList(wishListId:number)
  {
   this.wishListService.deleteWishListApiCall(wishListId).subscribe(res=>{
    console.log(res)
    console.log(wishListId);
    console.log(this.wishList);
    
    
    this.wishList=this.wishList.filter((ele:any)=>ele.WishListId!=wishListId)
  })
    
  }

}
