import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SellerService } from './services/seller.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: SellerService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (localStorage.getItem('seller')) {
      return true;
    }
    
    if(this.authService.isLoggedInGuard)
    {
      console.log("Access granted");
      return true;
    }else{
      console.log("Access not granted");
      return false;
    }
  }
}
