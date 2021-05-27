import {Component, Directive} from '@angular/core';
import {User} from "../../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Auth} from "../../model/auth";
import * as shajs from 'hash.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  @Directive({
    selector: '[toggle]'
  })
  title = 'angularclient';
  user: User;
  auth: Auth;
  hide = true;
  srcMainImg = 'assets/img/mainImg.jpg';

  show: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    this.user = new User("","","","","");
    this.auth = new Auth("","");
  }
  onSubmit() {
    this.user.passwd = shajs.sha256().update(this.user.passwd).digest("hex");
    let resp = this.userService.sendMail(this.user.email);
    resp.subscribe(data =>{
      console.log(data);
      if( data == "OK"){
        this.userService.save(this.user).subscribe(data => this.gotoFinish());
        // this.router.navigate(['/finish']);
      }
    })

  }
  gotoFinish() {
    this.router.navigate(['/finish']);
  }

}
