import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coin-preview',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {

  @Input() coin: any;

  constructor() { }

  ngOnInit() {
  }

}
