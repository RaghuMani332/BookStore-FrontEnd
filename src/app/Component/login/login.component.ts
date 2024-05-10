import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from 'src/app/Service/httpService/httpservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:string='';
  pass:string='';
  constructor(private httpservice:HttpserviceService) { }

  ngOnInit(): void {
  }
  login()
  {
    this.httpservice.login(this.username,this.pass).subscribe(res=>localStorage.setItem('authToken',res.data))

  }

}
