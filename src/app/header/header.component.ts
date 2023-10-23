import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string = 'default';
  sellerName: string = '';
  userName: string= '';
  cartItem= 0;

  constructor(private route: Router, private productService: ProductService) { }

  ngOnInit(): void {

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller";
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
            let userStore= localStorage.getItem('user');
            let userData= userStore && JSON.parse(userStore);
            this.userName= userData.name;
            this.menuType= "user";
            this.productService.getCartList(userData.id);
        } else {
          this.menuType = "default";
        }
      }
    });

    let cartData= localStorage.getItem('localCart');
    if(cartData){
      this.cartItem= JSON.parse(cartData).length;
    }

    this.productService.cartData.subscribe((items) => {
      this.cartItem= items.length;
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  submitSearch(val: string) {
    this.route.navigate([`search/${val}`])
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.productService.cartData.emit([]);
  }
}
