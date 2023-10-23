import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignUp, login } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;
  isLoginError= new EventEmitter(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['/seller-home']);
    });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/seller-home']);
    }
  }

  userLogin(data: login) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result:any) => {
      if(result && result.body && result.body.length){
        console.log("User logged in");
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['/seller-home']);
      }else{
        console.log("Login failed");
        this.isLoginError.emit(true);
      }
    });
  }

}
