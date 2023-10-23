import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{

  showLogin: Boolean= false;
  authError: string= '';

  constructor(private sellerSevice: SellerService, private router: Router) {}

  ngOnInit(): void {
    this.sellerSevice.reloadSeller();  
  }

  signUp(data: SignUp):void{
    this.sellerSevice.userSignUp(data);
  }

  login(data: any):void{
    this.authError="";
    this.sellerSevice.userLogin(data);
    this.sellerSevice.isLoginError.subscribe((isError) => {
      if(isError){
        this.authError="User email or password is not correct";
      }
    });
  }

  openLogin(){
    this.showLogin= true;
  }

  openSignUp(){
    this.showLogin= false;
  }
}
