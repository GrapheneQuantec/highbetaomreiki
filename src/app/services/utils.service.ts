import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Playlist, PlaylistOptions } from '@app/models/playlist';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private _backgroundVideoId: Subject<string> = new Subject();
  public readonly backgroundVideoId: Observable<string> = this._backgroundVideoId.asObservable();

  private _playlist: Subject<Playlist> = new Subject();
  public readonly playlist: Observable<Playlist> = this._playlist.asObservable();

  private _playlistOptions: Subject<PlaylistOptions> = new Subject();
  public readonly playlistOptions: Observable<PlaylistOptions> = this._playlistOptions.asObservable();

  constructor() { }

  setBackgroundVideo(videoId) {
    this._backgroundVideoId.next(videoId);
  }

  setBackgroundPlaylist(playlist: Playlist) {
    this._playlist.next(playlist);
  }

  setBackgroundPlaylistOptions(playlistOptions: PlaylistOptions) {
    this._playlistOptions.next(playlistOptions);
  }
}
