import { Injectable } from '@angular/core';
import { HttpserviceService } from '../httpService/httpservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpService:HttpserviceService) { }
  getNameByTokenApiCall()
  {
    return this.httpService.getNamebyToken();
  }
}
