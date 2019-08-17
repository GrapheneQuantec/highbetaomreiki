import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CoinService } from '@app/services/coin.service';
import { CoinsComponent } from '@app/components/coins/coins.component';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {

  // @Input() coinObverse: string;
  // @Input() coinReverse: string;
  @Input() subtitle: string;
  @Input() obverseText: string[];
  @Input() height: string;

  wordsInterval: number = 810;
  obverseWord: string;
  private obverseWordIndex: number = 0;

  coinReverse:any;
  coinObverse:any;

  constructor(
    private coinService: CoinService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // setInterval(x => this.iterateWord(), this.wordsInterval);
    this.coinService.parentCoin.subscribe(coin => this.coinReverse = {'background-image': `url(${coin.image.large})`})
    this.coinService.childCoin.subscribe(coin => this.coinObverse = {'background-image': `url(${coin.image.large})`})
  }

  iterateWord() {
    this.obverseWord = this.obverseText[this.obverseWordIndex];
    this.obverseWordIndex = (this.obverseWordIndex + 1) % this.obverseText.length;
  }

}
