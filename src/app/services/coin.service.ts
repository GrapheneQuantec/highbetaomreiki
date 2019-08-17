import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private _parentCoin: Subject<any> = new Subject();
  public readonly parentCoin: Observable<any> = this._parentCoin.asObservable();

  private _childCoin: Subject<any> = new Subject();
  public readonly childCoin: Observable<any> = this._childCoin.asObservable();

  constructor() { }

  setParentCoin(state) {
    this._parentCoin.next(state);
  }

  setChildCoin(state) {
    this._childCoin.next(state);
  }
}
