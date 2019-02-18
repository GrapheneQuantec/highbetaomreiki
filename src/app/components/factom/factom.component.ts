import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-factom',
  templateUrl: './factom.component.html',
  styleUrls: ['./factom.component.css']
})

export class FactomComponent implements OnInit {

  @Input() videoId: string;
  @Input() zIndex: number;
  @Input() volume: number;

  public player: any;

  constructor() { }

  ngOnInit() {
  }

  savePlayer(player) {
    this.player = player;
    this.player.playVideo();
    this.player.setVolume(this.volume);
  }

  onStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      this.player.seekTo(0);
    }
  }
  

}
