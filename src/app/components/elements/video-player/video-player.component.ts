import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '@app/services/utils.service';
import { RewindType, Video, Playlist } from '@app/models/playlist';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @Input() videoId: string;
  @Input() zIndex: number;

  isVideoOverlaid: boolean = false;
  isVideoUnstarted: boolean;
  private player;
  playlist: Playlist;
  loopAll: boolean = true;
  currentPlaylistIndex: number;


  constructor(
    private utilService: UtilsService,
  ) { }

  ngOnInit() {
    this.utilService.backgroundVideo.subscribe(video => this.loadVideo(video));
    this.utilService.playlist.subscribe(playlist => this.loadPlaylist(playlist));
    this.utilService.playlistOptions.subscribe(opt => this.loopAll = opt.loopAll);
    this.utilService.volumeChanged.subscribe(volume => this.volumeChanged(volume));
    this.utilService.rewind.subscribe(type => this.rewindVideo(type));
  }

  onStateChange(event) {
    switch (event.data) {
      case YT.PlayerState.UNSTARTED:
        this.isVideoUnstarted = true;
        this.isVideoOverlaid = true;
        break;
      case YT.PlayerState.BUFFERING:
        if (this.isVideoUnstarted) {
          this.isVideoOverlaid = true;
        }
        break;
      case YT.PlayerState.UNSTARTED:
        this.isVideoUnstarted = false;
        this.isVideoOverlaid = false;
        break;
      default:
        this.isVideoUnstarted = false;
        this.isVideoOverlaid = false;
        break;
    }
    this.utilService.updateVideoState(event);
  }


  savePlayer(player) {
    this.player = player;
    this.player.playVideo();
    this.player.setVolume(5);
  }

  playVideo() {
    this.player.playVideo();
  }

  volumeChanged(volume) {
    this.player.setVolume(volume);
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  loadVideo(video: Video) {
    if (video.paused) {
      this.player.cueVideoById({ 'videoId': video.videoId , 'startSeconds': video.start });
    } else {
      this.player.loadVideoById({ 'videoId': video.videoId , 'startSeconds': video.start });
      this.utilService.updateVideoState(YT.PlayerState.PAUSED);
    }
  }

  rewindVideo(type: RewindType) {
    switch (type) {
      case "fast_backward": this.player.seekTo(0); break;
      case "backward": this.player.seekTo(this.player.getCurrentTime() -5); break;
      case "play": this.player.playVideo(); break;
      case "pause": this.player.pauseVideo(); break;
      case "forward": this.player.seekTo(this.player.getCurrentTime() + 5); break;
      case "fast_forward": this.player.seekTo(this.player.getDuration()); break;
    
      default: break;
    }
  }

  loadPlaylist(playlist: Playlist) {
    this.playlist = playlist;
    if (playlist.videos && playlist.videos.length > 0) {
      this.currentPlaylistIndex = 0;
      this.loadVideo(this.playlist.videos[0]);
    }
  }

}
