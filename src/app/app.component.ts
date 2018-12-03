import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  backgroundVideoId = "4XT5PsazYcM";
  private player;
  private ytEvent;

  constructor(
    public authService: AuthService
  ) {
  }

  onStateChange(event) {
    this.ytEvent = event.data;
    if(event.data == YT.PlayerState.ENDED) {
      this.player.seekTo(0);
    }

  }
  savePlayer(player) {
    this.player = player;
    this.player.playVideo();
  }
  
  playVideo() {
    this.player.playVideo();
  }
  
  pauseVideo() {
    this.player.pauseVideo();
  }
}
