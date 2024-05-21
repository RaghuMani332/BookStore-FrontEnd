import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/Service/httpService/httpservice.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList! : any[];
  constructor(private httpService:HttpserviceService) { }

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != null) {
      this.httpService.getAllOrder().subscribe(res=>{
      this.orderList=res
    },err=>console.log(err))
    
  }
  }

}
