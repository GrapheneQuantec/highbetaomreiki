import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { UtilsService } from './services/utils.service';
import { Playlist, PlaylistOptions } from '@app/models/playlist';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  backgroundVideoId = "4XT5PsazYcM";
  private player;
  private ytEvent;
  playlist: Playlist;
  loopAll: boolean = true;
  currentPlaylistIndex: number;

  constructor(
    public authService: AuthService,
    private utilService: UtilsService,
  ) {
  }

  ngOnInit() {

    this.utilService.backgroundVideoId.subscribe(videoId => this.loadVideo(videoId));
    this.utilService.playlist.subscribe(playlist => this.loadPlaylist(playlist));
    this.utilService.playlistOptions.subscribe(opt => this.loopAll = opt.loopAll);
  }

  onStateChange(event) {
    this.ytEvent = event.data;
    if (event.data == YT.PlayerState.ENDED) {
      if (this.loopAll && this.playlist) {
        this.currentPlaylistIndex = (this.currentPlaylistIndex + 1) % this.playlist.videos.length;
        this.loadVideo(this.playlist.videos[this.currentPlaylistIndex].videoId);
      } else {
        this.player.seekTo(0);
      }
    }

  }
  savePlayer(player) {
    this.player = player;
    this.player.playVideo();
    this.player.setVolume(10);
  }

  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  loadVideo(videoId: string) {
    this.player.loadVideoById({ 'videoId': videoId })
  }

  loadPlaylist(playlist: Playlist) {
    console.log('load playlist', playlist);
    this.playlist = playlist;
    if (this.playlist.videos.length > 0) {
      this.currentPlaylistIndex = 0;
      this.loadVideo(this.playlist.videos[0].videoId);
    }
  }
}
