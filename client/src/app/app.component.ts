import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ecommerce';
  
  constructor(private basketService:BasketService, private accountService:AccountService){

  }
  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem('token');
    console.log("token "+token);
    this.accountService.loadCurrentUser(token).subscribe(()=>{
      console.log('load current user');
    },error=>{
      console.log(error);
    })
  }

  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log('initialize basket');
      },error=>{
        console.log(error);
      })
    }
  }



}
