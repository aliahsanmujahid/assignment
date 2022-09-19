
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public accountService: AccountService,private router: Router) { }



  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('eidhatuser'));
    if(user){
      this.accountService.setUser(user);
    }
  }
  loginpage(){
    this.router.navigate(['auth', {  'login':true }]);

  }
  signuppage(){
    this.router.navigate(['auth', {  'signup':true }]);
  }
  signout(){
    this.accountService.logout();
  }
  productapi(){
    this.router.navigateByUrl("product");
  }
}
