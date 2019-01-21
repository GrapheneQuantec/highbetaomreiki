import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Playlist, PlaylistOptions, Video, RewindType } from '@app/models/playlist';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private _backgroundVideo: Subject<Video> = new Subject();
  public readonly backgroundVideo: Observable<Video> = this._backgroundVideo.asObservable();

  private _playlist: Subject<Playlist> = new Subject();
  public readonly playlist: Observable<Playlist> = this._playlist.asObservable();

  private _playlistOptions: Subject<PlaylistOptions> = new Subject();
  public readonly playlistOptions: Observable<PlaylistOptions> = this._playlistOptions.asObservable();

  private _volumeChanged: Subject<number> = new Subject();
  public readonly volumeChanged: Observable<number> = this._volumeChanged.asObservable();

  private _videoState: Subject<any> = new Subject();
  public readonly videoState: Observable<any> = this._videoState.asObservable();

  private _rewind: Subject<RewindType> = new Subject();
  public readonly rewind: Observable<RewindType> = this._rewind.asObservable();


  constructor() { }

  setBackgroundVideo(video: Video) {
    this._backgroundVideo.next(video);
    return this.videoState;
  }

  updateVideoState(state) {
    this._videoState.next(state);
  }

  setBackgroundPlaylist(playlist: Playlist) {
    this._playlist.next(playlist);
  }

  setBackgroundPlaylistOptions(playlistOptions: PlaylistOptions) {
    this._playlistOptions.next(playlistOptions);
  }

  setBackgroundVolume(volume: number) {
    this._volumeChanged.next(volume);
  }

  rewindVideo(rewind: RewindType) {
    this._rewind.next(rewind);
  }
}
