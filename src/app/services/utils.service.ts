import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private _backgroundVideoId: BehaviorSubject<string> = new BehaviorSubject("4XT5PsazYcM");
  public readonly backgroundVideoId: Observable<string> = this._backgroundVideoId.asObservable();

  constructor() { }

  setBackgroundVideo(videoId) {
    this._backgroundVideoId.next(videoId);
  }
}
