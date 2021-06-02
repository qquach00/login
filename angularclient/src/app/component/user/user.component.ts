import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { User } from '../../model/user';
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {GridComponent} from "@syncfusion/ej2-angular-grids";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  data: Array<User> = new Array<User>();
  totalRecords: number = 100;
  columnDefs = [
    {headerName: 'Username', field: 'uname' },
    {headerName: 'Firstname', field: 'firstName' },
    {headerName: 'Lastname', field: 'lastName'},
    {headerName: 'Email', field: 'email'}
  ];
  request: any;
  username: string= "";
  pageNumber :number = 1;
  filter: any;

  // @ViewChild('grid') private grid : GridComponent;
  pageSettings: any;
  constructor(
    private service: UserService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,) {

  }


  ngOnInit() {
    this.getData();


    this.pageSettings = { pageSizes: true, pageSize: 5 };
    this.username = this.service.getUsername();
  }
  getData(){
    this.service.findAll()
      .subscribe(data => {
        this.data = data;
        this.totalRecords = this.data.length;
      })
  }

  deleteUser(username: string) {
    let resp = this.service.delete(username);
    resp.subscribe(data =>{
      if(data == "OK"){
        this.getData();
        alert("Xóa thành công!!");
      }else{
        alert("Xóa không thành công!!");
      }
    })

  }

  logout() {
    this.service.signOut();
    this.router.navigate(['/login']);
  }
}
