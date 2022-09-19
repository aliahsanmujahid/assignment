import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { Model } from 'src/app/_models/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  noaddress = false;
  changenam = false;
  createaddress: any = {
    district:'None',
    upazila:'None'
  };
  name: any = {
    name:''
  };
  useraddress:any = [];
  districts: any = [];
  upazilla: any = [];
  userId:number = null;
  model: Model ={
    username: '',
    email: '',
    image:''
  };

  constructor(public toastr: ToastrService,public accountService: AccountService,public router: Router) { }

  ngOnInit(): void {



      this.accountService.currentUser$.subscribe( user => {
        if(user){
          this.userId = user.id;
          this.name.name = user.displayName;
          this.getaddress();
        }
      });

  }
  ondisChange(){

      const selected = this.districts.find(m => m.name === this.createaddress.district);

      this.createaddress.upazila = "None";

      this.createaddress.districtId = selected ? selected.id : 0;

      this.upazilla = selected ? selected.subDto : [];
  }
  onupaChange(){
      const selected = this.upazilla.find(m => m.name === this.createaddress.upazila);
      this.createaddress.upazilaId =  selected ? selected.id : 0;
  }
  seeaddress(){
    if(this.useraddress !== null){
      this.createaddress=this.useraddress;
    }
    this.noaddress = !this.noaddress;
  }
  changename(){
       this.changenam = !this.changenam;
  }

  setAddress(){
    this.accountService.createaddress(this.userId,this.createaddress).subscribe(res=>{
        localStorage.setItem('address'+this.userId , JSON.stringify(res));
        this.useraddress = res;
        this.noaddress = !this.noaddress;
    });
  }
  setName(){

    var tempname:string;
    tempname = this.name.name;
    const user: User = JSON.parse(localStorage.getItem('eidhatuser'));

    

  }

  getaddress(){
     this.useraddress = [];
     const address = JSON.parse(localStorage.getItem('address'+this.userId));
     if(address){
      this.useraddress = address;
     }else{
      if(this.userId != null){
        this.accountService.getaddress(this.userId).subscribe(res =>{
          this.useraddress = res;
          localStorage.setItem('address'+this.userId , JSON.stringify(res));
       });
      }
     }
  }

}
