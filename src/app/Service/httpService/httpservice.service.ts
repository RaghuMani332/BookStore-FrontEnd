import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  
  
  

 

  private authHeader=new HttpHeaders({Authorization:`Bearer ${localStorage.getItem('authToken')}`})

  constructor(private httpService:HttpClient) { }

  login(userName:string,password:string)
  {
    return this.httpService.get<any>(`https://localhost:7098/api/User/${encodeURIComponent(userName)}/${encodeURIComponent(password)}
    `)
  }

  getAllBook():Observable<any>
  {
    return this.httpService.get<any>("https://localhost:7098/api/Book")
  }
  getAllCart():Observable<any>
  {
    return this.httpService.get<any>("https://localhost:7098/api/Cart",{headers:this.authHeader})
  }
  getAllCartThroughToken(token:string):Observable<any>
  {
    return this.httpService.get<any>("https://localhost:7098/api/Cart",{headers:new HttpHeaders({Authorization:`Bearer ${token}`})})
  }
  addToCart(data:{quantity:number,bookId:number},token?:string):Observable<any>
  {
    if(token!=null)
      {
        return this.httpService.post<any>('https://localhost:7098/api/Cart',{...data},{headers:new HttpHeaders({Authorization:`Bearer ${token}`})})
      }
    return this.httpService.post<any>('https://localhost:7098/api/Cart',{...data},{headers:this.authHeader})
  }
  updateQuantiyToCart(cartId:number,quantity:number,token?:string):Observable<any>
  {
    if(token!=null)
      {
        return this.httpService.put<any>(`https://localhost:7098/api/Cart/${cartId}/${quantity}`,{},{headers:new HttpHeaders({Authorization:`Bearer ${token}`})})
      }
    return this.httpService.put<any>(`https://localhost:7098/api/Cart/${cartId}/${quantity}`,{},{headers:this.authHeader})
  }
  unCartItem(cartId:number):Observable<any>
  {
    return this.httpService.patch(`https://localhost:7098/api/Cart?cartId=${cartId}`,{},{headers:this.authHeader})
  }
  getNamebyToken():Observable<any>
  {
    return this.httpService.get<any>(`https://localhost:7098/api/Book/getNameByToken`,{headers:this.authHeader})
  }
  getWishList():Observable<any>
  {
    return this.httpService.get<any>(`https://localhost:7098/api/WishList`,{headers:this.authHeader})
  }
  addWishList(BookId:number):Observable<any>{
    // const requestBody = { bookId: bookId};
    return this.httpService.post(`https://localhost:7098/api/WishList`,{bookId: BookId},{headers:this.authHeader})
  }
  deleteWishList(wishListId:number):Observable<any>
  {
    return this.httpService.delete(`https://localhost:7098/api/WishList?wishListId=${wishListId}`,{headers:this.authHeader})
  }
  removeAddress(addressId:number):Observable<any>
  {
    return this.httpService.delete(`https://localhost:7098/api/Address?addressId=${addressId}`,{headers:this.authHeader})
  }
  getAddress():Observable<any>
  {
    return this.httpService.get(`https://localhost:7098/api/Address`,{headers:this.authHeader})
  }
  updatAddress(userData: any, addressId: any):Observable<any> {
    return this.httpService.put(`https://localhost:7098/api/Address?addressId=${addressId}`,{userData},{headers:this.authHeader})
  }
  addAddress(userData: any):Observable<any> {
    userData.type=Number(userData.type)
    return this.httpService.post(`https://localhost:7098/api/Address`,{...userData},{headers:this.authHeader})
  }
  addOrder(orderBody: { addressId: any; orderDate: string; bookId: any; }):Observable<any> {
    return this.httpService.post(`https://localhost:7098/api/Order`,{...orderBody},{headers:this.authHeader})
  }
  getAllOrder():Observable<any> {
    return this.httpService.get(`https://localhost:7098/api/Order/GetOrder`,{headers:this.authHeader})
  }
}
