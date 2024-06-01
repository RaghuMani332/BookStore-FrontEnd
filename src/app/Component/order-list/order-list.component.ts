import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/Service/dataService/data-service.service';
import { HttpserviceService } from 'src/app/Service/httpService/httpservice.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList! : any[];
  constructor(private httpService:HttpserviceService,private dataService:DataServiceService) { }

  ngOnInit(): void {
    this.dataService.changeHeaderDataState('MyOrders')
    if (localStorage.getItem('authToken') != null) {
      this.httpService.getAllOrder().subscribe(res=>{
      this.orderList=res.data
    },err=>console.log(err))
    
  }
  }

}
