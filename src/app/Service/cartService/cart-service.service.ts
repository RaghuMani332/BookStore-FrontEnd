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
  addToCartApiCall(data:any)
  {
    return this.httpService.addToCart(data)
  }
}
