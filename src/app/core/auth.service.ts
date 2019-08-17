// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User, Roles } from '../core/user';


import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {

  user$: Observable<User>;
  // private user: BehaviorSubject<User> = new BehaviorSubject(null)
  private userDetails: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private _firebaseAuth: AngularFireAuth,
    // ,
    // private router: Router
  ) {
    // this.afs.firestore.settings({ timestampsInSnapshots: true });

    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return new Observable();
      }
    }));
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: 'select_account'
    });

    return this.afAuth.auth.signInWithPopup(provider)
      .then(credential => {
        this.updateUser(credential.user);
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(value => location.reload());
  }

  private updateUser(authData) {
    const userData = new User(authData);

    const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/' + authData.uid);

    let roles: Roles = authData.roles;
    if (environment.name == 'liomreiki' && !authData.roles['reader']) {
      roles['reader'] = true;
    }

    const data: User = {
      uid: authData.uid,
      email: authData.email,
      photoURL: authData.photoURL,
      displayName: authData.displayName,
      roles: roles
    };

    return userRef.set(data, { merge: true });

  }

  canRead(user: User): boolean {
    return this.checkAuthorization(user, ['admin', 'author', 'reader']);
  }

  canEdit(user: User): boolean {
    return this.checkAuthorization(user, ['admin', 'author']);
  }

  canDelete(user: User): boolean {
    return this.checkAuthorization(user, ['admin', 'author']);
  }

  canSeeCoins(user: User): boolean {
    return this.checkAuthorization(user, ['coinuser', 'coinmaster']);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

}
