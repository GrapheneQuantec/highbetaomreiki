import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { MatrixColleciton, MatrixItem } from '../models/matrixcollection';

@Injectable({
  providedIn: 'root'
})
export class MatrixcollectionService {

  affirmationsCollection: AngularFirestoreCollection<MatrixColleciton>;
  affirmations: Observable<MatrixColleciton[]>;
  affirmationDoc: AngularFirestoreDocument<MatrixColleciton>;
  id: string;
  afs$: AngularFirestore;
  collectionName: string = 'matrix';

  constructor(public afs: AngularFirestore) {

    this.afs$ = afs;
    this.getItems();
  }

  getItems() {

    this.affirmationsCollection = this.afs$.collection<MatrixColleciton>(this.collectionName, ref => ref.orderBy('matrixItems'));
    this.affirmations = this.affirmationsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as MatrixColleciton;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
    return this.affirmations;
  }

  addItem(matrix: MatrixColleciton) {
    let promise = new Promise((resolve, reject) => {
      this.affirmationsCollection.add(matrix)
        .then((data) => { resolve(data); })
        .catch(error => reject(error));
    });
    return promise;
  }

  updateItem(affirmation: MatrixColleciton) {
    this.affirmationDoc = this.afs.doc<MatrixColleciton>(this.collectionName + "/" + affirmation.id);
    this.affirmationDoc.update(affirmation);
  }

  deleteItem(affirmation: MatrixColleciton) {
    this.affirmationDoc = this.afs.doc<MatrixColleciton>(this.collectionName + "/" + affirmation.id);
    this.affirmationDoc.delete();
  }
}
