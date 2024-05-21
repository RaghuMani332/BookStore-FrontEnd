import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpService/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private httpService:HttpserviceService) { }
  getAllWishListApiCall()
  {
    return this.httpService.getWishList();
  }
  addWishListApiCall(bookId:number)
  {
    return this.httpService.addWishList(bookId);
  }
  deleteWishListApiCall(wishListId:number)
  {
      return this.httpService.deleteWishList(wishListId);
  }
}
