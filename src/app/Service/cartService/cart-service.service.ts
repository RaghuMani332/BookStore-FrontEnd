import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpService/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor(private httpService:HttpserviceService) { }

  getAllCartApiCall()
  {
    return this.httpService.getAllCart();
  }
  getAllCartApiCallThroughToken(token:string)
  {
    return this.httpService.getAllCartThroughToken(token);
  }
  addToCartApiCall(data:{quantity:number,bookId:number},token?:string)
  {
    return this.httpService.addToCart(data,token)
  }
  updateQuantityToCartApiCall(cartId:number,quantity:number,token?:string)
  {
    return this.httpService.updateQuantiyToCart(cartId,quantity,token);
  }
  unCartItem(cartId:number)
  {
    return this.httpService.unCartItem(cartId);
  }
}
