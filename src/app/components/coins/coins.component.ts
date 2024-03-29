import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemfireService } from '@app/services/itemfire.service';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { CoinService } from '@app/services/coin.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  @Input() title: string;
  @Input() intervalTime: number;
  @Input() coinType: "parent" | "child";
  @Input() initialIndex: number = 0;

  @Output() coinClicked = new EventEmitter();

  coins
  
  currentCoin
  currentCoinIndex = 0;
  isPlaying
  interval

  constructor(
    public httpClient: HttpClient,
    public itemService: ItemfireService,
    private coinService: CoinService,
  ) { }

  ngOnInit() {
    this.httpClient.get("https://api.coingecko.com/api/v3/coins/list").subscribe((list: any[]) => {
      this.coins = list;
      this.currentCoinIndex = Math.floor((Math.random() * (this.coins.length -1)));
      this.setCoin();
      this.playCoin();

    });
  }

  getCoinLink(coinId) {
    return `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`;
  }

  fetchCoins() {

  }
  
  setCoin() {
    this.httpClient.get(this.getCoinLink(this.coins[this.currentCoinIndex].id)).subscribe((coin: any) => this.selectCoin(coin));
  }

  SetCoinIndex(direction) {
    this.currentCoinIndex = (this.currentCoinIndex + this.coins.length + direction) % this.coins.length;
  }

  prevCoin() {
    this.pauseCoin();
    this.SetCoinIndex(-1);
    this.setCoin();
   }

  nextCoin() {
    this.pauseCoin();
    this.SetCoinIndex(1);
    this.setCoin();
  }

  playCoin() {
    this.isPlaying = true;
    this.interval = setInterval(() => {
      this.SetCoinIndex(1);
      this.setCoin();
    }, this.intervalTime);
  }

  pauseCoin() {
    this.isPlaying = false;
    clearInterval(this.interval);
  }

  selectCoin(coin) {
    this.currentCoin = coin;
    if (this.coinType == "parent") {
      this.coinService.setParentCoin(coin);
    }
    if (this.coinType == "child") {
      this.coinService.setChildCoin(coin);
    }
  }

}
