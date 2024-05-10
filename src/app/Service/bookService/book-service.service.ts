import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpService/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private httpservice:HttpserviceService) { }
  getAllBookApiCall()
  {
    return this.httpservice.getAllBook();
  }
}
