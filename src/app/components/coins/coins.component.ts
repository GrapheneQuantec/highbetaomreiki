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

  isParentPlaying
  isChildPlaying

  primaryInterval
  secondaryInterval

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
      this.coins = list;

      this.setParentCoin();
      this.playParentCoin();

      this.setChildCoin();
      this.playChildCoin();

    });
  }

  getCoinLink(coinId) {
    return `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;
  }

  fetchCoins() {

  }
  
  setParentCoin() {
    this.httpClient.get(this.getCoinLink(this.coins[this.currentCoinIndex].id)).subscribe((coin: any) => this.currentCoin = coin);
  }

  SetParentCoinIndex(direction) {
    this.currentCoinIndex = (this.currentCoinIndex + this.coins.length + direction) % this.coins.length;
  }

  prevParentCoin() {
    this.pauseParentCoin();
    this.SetParentCoinIndex(-1);
    this.setParentCoin();
   }

  nextParentCoin() {
    this.pauseParentCoin();
    this.SetParentCoinIndex(1);
    this.setParentCoin();
  }

  playParentCoin() {
    this.isParentPlaying = true;
    this.primaryInterval = setInterval(() => {
      this.SetParentCoinIndex(1);
      this.setParentCoin();
    }, 720);
  }

  pauseParentCoin() {
    this.isParentPlaying = false;
    clearInterval(this.primaryInterval);
  }

  setChildCoin() {
    this.httpClient.get(this.getCoinLink(this.coins[this.secondCurrentCoinIndex].id)).subscribe((coin: any) => this.secondCurrentCoin = coin);
  }

  SetChildCoinIndex(direction) {
    this.secondCurrentCoinIndex = (this.secondCurrentCoinIndex + this.coins.length - 1) % this.coins.length;
  }

  prevChildCoin() {
    this.pauseChildCoin();
    this.SetChildCoinIndex(-1);
    this.setChildCoin();
   }

  nextChildCoin() {
    this.pauseChildCoin();
    this.SetChildCoinIndex(1);
    this.setChildCoin();
  }

  playChildCoin() {
    this.isChildPlaying = true;
    this.secondaryInterval = setInterval(() => {
      this.SetChildCoinIndex(1);
      this.setChildCoin();
    }, 7200);
  }

  pauseChildCoin() {
    this.isChildPlaying = false;
    clearInterval(this.secondaryInterval);
  }
}
