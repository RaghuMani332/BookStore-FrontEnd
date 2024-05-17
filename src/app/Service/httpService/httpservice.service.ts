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
  addToCart(data:{quantity:number,bookId:number}):Observable<any>
  {
    return this.httpService.post<any>('https://localhost:7098/api/Cart',{...data},{headers:this.authHeader})
  }
  updateQuantiyToCart(cartId:number,quantity:number):Observable<any>
  {
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
}
