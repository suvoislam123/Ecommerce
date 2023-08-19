import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../models/pagination';
import { IBrand } from '../models/brand';
import { IProductType } from '../models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7035/api/'
  constructor(private http:HttpClient) { }
  getProducts(shopeParams:ShopParams)
  {
    // let params;
    // if(brandId)
    // {
    //   if(typeId)
    //   {
    //     params=new HttpParams().set('brandId',brandId).set('typeId',typeId);
    //   }
    //   else{
    //     params =new HttpParams().set('brandId',brandId)
    //   }
      
    // }
    // if(typeId && brandId==undefined)
    // {
    //   params=params =new HttpParams().set('typeId',typeId);
    // }
    // let params = new HttpParams();
    // if(typeId)
    // {
    //   params.append('typeId',typeId.toString());
    // }
    // if(brandId)
    // {
    //   params.append('brandId',brandId.toString());
    // }
    //  return this.http.get<IPagination>('https://localhost:7035/api/Products?PageSize=6&PageIndex='+shopeParams.pageNumber);
    return this.http.get<IPagination>(this.baseUrl+'products?'+(shopeParams.brandId?'brandId='+shopeParams.brandId.toString():'')+'&&'+(shopeParams.typeId?'typeId='+shopeParams.typeId.toString():'')+'&&'+(shopeParams.sort?'sort='+shopeParams.sort:'')+'&&'+(shopeParams.search?'search='+shopeParams.search:'')+'&&'+(shopeParams.pageNumber?'pageIndex='+shopeParams.pageNumber.toString():'')+'&&'+(shopeParams.pageSize?'PageSize='+shopeParams.pageSize.toString():''));
  }
  getBrands()
  {
    return this.http.get<IBrand[]>(this.baseUrl+'Products/brands');
  }
  getProductTypes()
  {
    return this.http.get<IProductType[]>(this.baseUrl+'Products/types');
  }
  
}
