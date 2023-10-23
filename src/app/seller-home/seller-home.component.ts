import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | product[];
  productMessage: undefined | string;
  icon= faTrash;
  editIcon= faEdit;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((result) => {
      this.productMessage = "Product is deleted";
      this.list();
    });

    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.productService.productList().subscribe((result) => {
      this.productList = result;
    });
  }
}
