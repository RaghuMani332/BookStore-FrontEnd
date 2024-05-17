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
  addToCartApiCall(data:{quantity:number,bookId:number})
  {
    return this.httpService.addToCart(data)
  }
  updateQuantityToCartApiCall(cartId:number,quantity:number)
  {
    return this.httpService.updateQuantiyToCart(cartId,quantity);
  }
  unCartItem(cartId:number)
  {
    return this.httpService.unCartItem(cartId);
  }
}
