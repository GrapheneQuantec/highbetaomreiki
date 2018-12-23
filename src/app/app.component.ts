import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { UtilsService } from './services/utils.service';

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
    public authService: AuthService,
    private utilService: UtilsService,
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
    this.player.setVolume(10);
    this.utilService.backgroundVideoId.subscribe(videoId => this.player.loadVideoById({'videoId': videoId}));
  }
  
  playVideo() {
    this.player.playVideo();
  }
  
  pauseVideo() {
    this.player.pauseVideo();
  }
}
