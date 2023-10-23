import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit{

  productData: undefined | product;
  productMessage: undefined | string;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    let productId= this.route.snapshot.paramMap.get('id');
    
    productId && this.productService.getProduct(productId).subscribe((data) => {
      this.productData= data;
    });
  }

  submit(data: product){

    if(this.productData){
      data.id= this.productData.id;
    }

    this.productService.updateProduct(data).subscribe((result) => {
      this.productMessage= "Product has updated";
    });

    setTimeout(() => {
      this.productMessage= undefined;
    }, 3000);
  }
}
