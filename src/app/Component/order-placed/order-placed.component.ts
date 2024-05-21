import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from 'src/app/Service/httpService/httpservice.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {

  orderDetail :any
  constructor(private route: ActivatedRoute,private httpService:HttpserviceService) { }

  ngOnInit(): void {
  this.httpService.getAllOrder().subscribe(result1=>{
    this.route.params.subscribe((result2) => {
      console.log(result1);
      
      this.orderDetail = result1.filter((e: any) => e.orderId == result2['orderId']);
      console.log(this.orderDetail);
      console.log(this.orderDetail[0].addressMobileNumber);
      
    })
  });

}

}
