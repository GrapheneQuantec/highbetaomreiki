import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {

  @Input() coinObverse: string;
  @Input() coinReverse: string;
  @Input() subtitle: string;
  @Input() obverseText: string[];

  wordsInterval: number = 810;
  obverseWord: string;
  private obverseWordIndex: number = 0;

  constructor() { }

  ngOnInit() {
    // setInterval(x => this.iterateWord(), this.wordsInterval);
  }

  iterateWord() {
    this.obverseWord = this.obverseText[this.obverseWordIndex];
    this.obverseWordIndex = (this.obverseWordIndex + 1) % this.obverseText.length;
  }

}
