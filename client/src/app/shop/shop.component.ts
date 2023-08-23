import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../models/product';
import { ShopService } from './shop.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBrand } from '../models/brand';
import { IProductType } from '../models/productType';
import { ShopParams } from '../models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  products:IProduct[];
  brands:IBrand[];
  productsTypes:IProductType[];
  ShopParams:ShopParams = new ShopParams();
  totalCount:number;
  sortOptions=[
    {name:'Aphabatical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High to Low',value:'priceDesc'}
  ];

 
  constructor(private shopeService:ShopService,private http:HttpClient) {  
  }
  ngOnInit(): void {
   this.getProducts();
   this.getBrands();
   this.getProductsTypes();
  }
  getProducts()
  {
    this.shopeService.getProducts(this.ShopParams).subscribe((response)=>{
      this.products=response.data;
      this.ShopParams.pageNumber = response.pageIndex;
      this.ShopParams.pageSize = response.pageSize;
      this.totalCount=response.count;
    });
  }
  getBrands()
  {
    this.shopeService.getBrands().subscribe((response)=>{
      this.brands=[{id:0,name:'All'},...response];
    },error=>{
      console.log(error)
    })
  }
  getProductsTypes()
  {
    this.shopeService.getProductTypes().subscribe(response=>{
      this.productsTypes=[{id:0,name:'All'},...response];
    },error=>{
      console.log(error)
    });
  }
  onBrandSelected(brandId:number)
  {
    this.ShopParams.brandId = brandId;
    this.ShopParams.pageNumber=1;
    this.getProducts();
  }
  onTypeIdSelected(typeId:number)
  {
    this.ShopParams.typeId=typeId;
    this.ShopParams.pageNumber=1;
    this.getProducts();
  }
  onSortSelected(sort:any)
  {
    this.ShopParams=sort.target.value;
    this.getProducts();
  }
  onPageChanged(event: any) {
    if (this.ShopParams.pageNumber !== event) {
      this.ShopParams.pageNumber = event;
      console.log("wwww");
      console.log(event)
      this.getProducts();
    }
  }
  onSearch() {
    this.ShopParams.search = this.searchTerm.nativeElement.value;
    this.ShopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.ShopParams = new ShopParams();
    this.getProducts();
  }

}
