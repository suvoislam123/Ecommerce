import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent  implements OnInit{
  product:IProduct;
  constructor(private shopeService:ShopService,private activatedRoute:ActivatedRoute)
  {

  }
  ngOnInit(): void {
    this.loadProduct();
  }
  loadProduct()
  {
    this.shopeService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product=>{
      this.product=product;
    },erro=>{console.log(erro)})
  }
   
}
