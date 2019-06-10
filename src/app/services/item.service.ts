import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;
  itemDoc: AngularFirestoreDocument<any>;
  id: string;
  afs$: AngularFirestore;

  constructor(public afs: AngularFirestore) {
    this.afs$ = afs;
  }

  getItemById(collectionName: string, id?: string) {
    this.itemsCollection = this.afs$.collection<any>(collectionName);

    return this.itemsCollection.doc(id).ref.get().then(function (doc) {
      return doc;
    });
  }

  getItems(collectionName: string) {

    this.itemsCollection = this.afs$.collection<any>(collectionName);
    this.items = this.itemsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as any;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
    return this.items;
  }

  addItem(item: any) {
    const promise = new Promise((resolve, reject) => {
      this.itemsCollection.add(item)
        .then((data) => { resolve(data); })
        .catch(error => reject(error));
    });
    return promise;
  }

  updateItem(collectionName: string, item: any) {
    this.itemDoc = this.afs.doc<any>(collectionName + "/" + item.id);
    this.itemDoc.update(item);
  }

  deleteItem(collectionName: string, item: any) {
    this.itemDoc = this.afs.doc<any>(collectionName + "/" + item.id);
    this.itemDoc.delete();
  }

}



