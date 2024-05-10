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
    return this.httpService.get<any>(`https://localhost:7098/api/User/raghum11154%40gmail.com/Raghu%401234
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
  addToCart(data:any):Observable<any>
  {
    return this.httpService.post<any>('https://localhost:7098/api/Cart',{data},{headers:this.authHeader})
  }
}
