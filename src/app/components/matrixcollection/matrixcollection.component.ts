import { Component, OnInit } from '@angular/core';
import { MatrixcollectionService } from '../../services/matrixcollection.service';
import { MatrixColleciton, MatrixItem, MatrixCateogory } from '../../models/matrixcollection';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-matrixcollection',
  templateUrl: './matrixcollection.component.html',
  styleUrls: ['./matrixcollection.component.css']
})
export class MatrixcollectionComponent implements OnInit {

  verbalsCollection: MatrixColleciton;
  noneverbalsCollection: MatrixColleciton;
  verbals: MatrixItem[]; //: string[] = ["MultiOrgasms", "Orgy", "Orgone", "Threesome", "Eso", "Sex", "Klitorizmus", "Extasy", "Sextasy", "Swingers", "Harem", "Clitoris", "Square", "Prostitute", "Cul de sac ", "Gspot"];
  nonverbals: string[] = ["Blowjob", "Gangbang", "Tantra", "Cytherea", "YabYum", "Whita Tara", "Green Tara", "Kurukulla", "Aphrodisia", "Messalina", "Mylitta", "Kuan Yin", "Shakti", "Kundalini", "Linga", "Lingam", "Hui Yin", "Inn", "Ina", "Cli", "Skwa", "Om", "Ana", "Joa", "Oja", "Asi", "Ave", "Awi", "Um Symbol"];
  subs = new Subscription();
  numbers: MatrixItem[];
  letters: MatrixItem[];

  constructor(
    private matrixcollectionService: MatrixcollectionService,
    private dragulaService: DragulaService
  ) { }

  ngOnInit() {

    // this.addAffirmation();

    this.matrixcollectionService.getItems().subscribe(items => {
      if (items.length > 0) {

        this.verbalsCollection = items[2];
        this.noneverbalsCollection = items[1];

        this.sortCollection(this.verbalsCollection);
        this.sortCollection(this.noneverbalsCollection);

        this.verbals = this.verbalsCollection.matrixItems;

        this.letters = this.noneverbalsCollection.matrixItems;
      }
    });

    this.subs.add(this.dragulaService.drop("row")
      .subscribe(({ name, el, target, source, sibling }) => {
        // console.log('el.class', el.classList[0]);

        // get clicked item from collection
        let updateItem = this.verbalsCollection.matrixItems.find(x => x.content == el.classList[0]);

        // get that item's array index
        let index = this.verbalsCollection.matrixItems.indexOf(updateItem);


        // get clicked item from collection
        let siblingupdateItem = this.verbalsCollection.matrixItems.find(x => x.content == sibling.classList[0]);

        // get that item's array index
        let siblingindex = this.verbalsCollection.matrixItems.indexOf(siblingupdateItem);
      })
    );

  }


  sortCollection(collection: MatrixColleciton) {
    collection.matrixItems.sort(function (name1, name2) {
      if (name1.index < name2.index) {
        return -1;
      } else if (name1.index > name2.index) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  addAffirmation() {
    var item: MatrixColleciton = {
      category: 'letters',
      matrixItems: [
        { content: "Blowjob", index: 0 },
        { content: "Gangbang", index: 1 },
        { content: "Tantra", index: 2 },
        { content: "Cytherea", index: 3 },
        { content: "YabYum", index: 4 },
        { content: "Whita Tara", index: 5 },
        { content: "Green Tara", index: 6 },
        { content: "Kurukulla", index: 7 },
        { content: "Aphrodisia", index: 8 },
        { content: "Messalina", index: 9 },
        { content: "Mylitta", index: 10 },
        { content: "Kuan Yin", index: 11 },
        { content: "Shakti", index: 12 },
        { content: "Kundalini", index: 13 },
        { content: "Linga", index: 14 },
        { content: "Lingam", index: 15 },
        { content: "Hui Yin", index: 16 },
        { content: "Inn", index: 17 },
        { content: "Ina", index: 18 },
        { content: "Cli", index: 19 },
        { content: "Skwa", index: 20 },
        { content: "Om", index: 21 },
        { content: "Ana", index: 22 },
        { content: "Joa", index: 23 },
        { content: "Oja", index: 24 },
        { content: "Asi", index: 25 },
        { content: "Ave", index: 26 },
        { content: "Awi", index: 27 },
        { content: "Um Symbol", index: 28 }
      ]
    }

    this.matrixcollectionService.addItem(item).then((doc: MatrixColleciton) => {
      item.id = doc.id;
      this.matrixcollectionService.updateItem(item);
    });
  }

  moveBack(item: MatrixItem, items: MatrixItem[], collection: MatrixColleciton) {
    this.modifyItemIndex(item, -1, items, collection);
  }

  moveFurther(item: MatrixItem, items: MatrixItem[], collection: MatrixColleciton) {
    this.modifyItemIndex(item, 1, items, collection);
  }

  modifyItemIndex(item: MatrixItem, modifier: number, items: MatrixItem[], collection: MatrixColleciton) {

    // get clicked item from collection
    let updateItem = items.find(x => x.content == item.content);
    // save that item's index value
    let currentItemIndex = updateItem.index;
    // get that item's array index
    let index = items.indexOf(updateItem);

    // change item's index value according to modifier
    items[index].index = item.index + modifier;
    // change neighbouring (neighbour towards the direction of change) item's index value to that of a clicked item
    items[index + modifier].index = currentItemIndex;

    // update the collection
    this.matrixcollectionService.updateItem(collection);
  }

}
