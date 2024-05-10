import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from 'src/assets/BookObjectInterface';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private bookObj=new BehaviorSubject<Book>({});
  currentState=this.bookObj.asObservable();
  constructor() { }
  changeState(value:Book)
  {
    this.bookObj.next(value);
  }
}
