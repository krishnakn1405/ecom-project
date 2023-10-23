import { Component, OnInit } from '@angular/core';
import { SignUp, cart, login, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  showLogin: Boolean = false;
  authError: string = '';

  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(data: SignUp) {
    this.userService.userSignUp(data);
  }

  login(data: login) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid user details";
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = JSON.parse(user).id;

    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;

        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("Item stored in db");
            }
          })

          if (cartDataList.length === index + 1) {
            localStorage.removeItem("localCart");
          }

        }, 500)

      })
    }

    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000)
    
  }

}
