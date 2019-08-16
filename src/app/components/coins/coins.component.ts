import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemfireService } from '@app/services/itemfire.service';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  coins$
  coins
  currentCoin
  currentCoinIndex = 0;
  secondCurrentCoin
  secondCurrentCoinIndex = 2000;

  constructor(
    public httpClient: HttpClient,
    public itemService: ItemfireService,
  ) { }

  ngOnInit() {
    // this.coins$ = this.itemService.getItems('coins');
    // this.coins$.subscribe(coins => {
    //   this.coins = coins;
    //   this.currentCoin = coins[0];
    //   console.log('currentCoin', this.currentCoin)
    // });

    this.httpClient.get("https://api.coingecko.com/api/v3/coins/list").subscribe((list: any[]) => {
      setInterval(() => {
        this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${list[this.currentCoinIndex].id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`).subscribe((coin: any) => {
          this.currentCoin = coin;
          this.currentCoinIndex = (this.currentCoinIndex + 1) % list.length;
        });
      }, 790);

      setInterval(() => {
        this.httpClient.get(`https://api.coingecko.com/api/v3/coins/${list[this.secondCurrentCoinIndex].id}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`).subscribe((coin: any) => {
          this.secondCurrentCoin = coin;
          this.secondCurrentCoinIndex = (this.secondCurrentCoinIndex + 1) % list.length;
        });
      }, 1000);

    });
  }

  fetchCoins() {
    
  }
}
