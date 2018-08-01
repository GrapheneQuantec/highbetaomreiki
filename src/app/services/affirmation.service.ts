import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Affirmation } from '../models/affirmation';

@Injectable({
  providedIn: 'root'
})
export class AffirmationService {

  affirmationsCollection: AngularFirestoreCollection<Affirmation>;
  affirmations: Observable<Affirmation[]>;
  affirmationDoc: AngularFirestoreDocument<Affirmation>;
  id: string;
  afs$: AngularFirestore;
  collectionName: string = 'affirmations';

  constructor(public afs: AngularFirestore) { 

    this.afs$ = afs;
    this.getAffirmations();
  }

  getAffirmationById(id?: string) {
      this.affirmationsCollection = this.afs$.collection<Affirmation>(this.collectionName);

      var selectedAffirmation = this.affirmationsCollection.doc(id).ref.get().then(function(doc) {
          return doc;
      });
      return selectedAffirmation;
      
    }

  getAffirmations() {

      this.affirmationsCollection = this.afs$.collection<Affirmation>(this.collectionName);
      this.affirmations = this.affirmationsCollection.snapshotChanges().pipe(map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Affirmation;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
      return this.affirmations;
  }

  addItem(affirmation: Affirmation){
    let promise = new Promise((resolve, reject) => {
      this.affirmationsCollection.add(affirmation)
      .then((data) => { resolve(data); })
      .catch(error => reject(error) );
    });
    return promise;
  }

  updateItem(affirmation: Affirmation) {
    this.affirmationDoc = this.afs.doc<Affirmation>(this.collectionName + "/" + affirmation.id);
    this.affirmationDoc.update(affirmation);
  }

  deleteItem(affirmation: Affirmation){
    this.affirmationDoc = this.afs.doc<Affirmation>(this.collectionName + "/" + affirmation.id);
    this.affirmationDoc.delete();
  }

}



