import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemfireService {

  itemDoc: AngularFirestoreDocument<any>;

  constructor(
    private db: AngularFirestore,
  ) {
  }

  addItem(item: any, collectionName: string) {
    console.log('hello')
    const promise = new Promise((resolve, reject) => {
        this.db.collection(collectionName).add(item)
        .then((data) => { resolve(data); })
        .catch(error => reject(error));
    });
    return promise;
  }

  updateItem(item: any, collectionName: string) {
    this.itemDoc = this.db.collection(collectionName).doc<any>(item.id);
    this.itemDoc.update(item);
  }

  deleteItem(item: any, collectionName: string) {
    this.itemDoc = this.db.collection(collectionName).doc<any>(item.id);
    this.itemDoc.delete();
  }

  getItems(collectionName: string) {
    return this.db.collection(collectionName).valueChanges({idField: 'id'});
  }

  getItemById(collectionName: string, id: string) {
    return this.db.collection(collectionName).doc(id);//.valueChanges({idField: 'id'});
  }

  getItemsOrdered(collectionName: string) {
    return this.db.collection(collectionName, ref => ref.orderBy('order')).valueChanges({idField: 'id'});
  }

  getItemsOrderedBy(collectionName: string, orderBy: string, direction: "asc" | "desc" = "asc") {
    return this.db.collection(collectionName, ref => ref.orderBy(orderBy, direction)).valueChanges({idField: 'id'});
  }

  getItemsByCategory(collectionName: string, category: string) {
    return this.db.collection(collectionName, ref => ref.where("category", "==", category)).valueChanges({idField: 'id'}); 
  }

  getItemsByAttribute(collectionName: string, attributeName: string, attributeValue: string) {
    return this.db.collection(collectionName, ref => ref.where(attributeName, "==", attributeValue)).valueChanges({idField: 'id'}); 
  }

  getItemsByCategoryOrderedBy(collectionName: string, category: string, orderBy: string, direction: "asc" | "desc" = "asc") {
    return this.db.collection(collectionName, ref => ref.where("category", "==", category).orderBy(orderBy, direction)).valueChanges({idField: 'id'}); 
  }

}
