import { Component, OnInit } from '@angular/core';
import { MatrixcollectionService } from '../../services/matrixcollection.service';
import { MatrixColleciton, MatrixItem, MatrixCateogory } from '../../models/matrixcollection';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-matrixcollection',
  templateUrl: './matrixcollection.component.html',
  styleUrls: ['./matrixcollection.component.css']
})
export class MatrixcollectionComponent implements OnInit {

  verbalsCollection: MatrixColleciton;
  verbals: MatrixItem[]; //: string[] = ["MultiOrgasms", "Orgy", "Orgone", "Threesome", "Eso", "Sex", "Klitorizmus", "Extasy", "Sextasy", "Swingers", "Harem", "Clitoris", "Square", "Prostitute", "Cul de sac ", "Gspot"];
  nonverbals: string[] = ["Blowjob", "Gangbang", "Tantra", "Cytherea", "YabYum", "Whita Tara", "Green Tara", "Kurukulla", "Aphrodisia", "Messalina", "Mylitta", "Kuan Yin", "Shakti", "Kundalini", "Linga", "Lingam", "Hui Yin", "Inn", "Ina", "Cli", "Skwa", "Om", "Ana", "Joa", "Oja", "Asi", "Ave", "Awi", "Um Symbol"];

  constructor(private matrixcollectionService: MatrixcollectionService) { }

  ngOnInit() {
    this.matrixcollectionService.getItems().subscribe(items => {
      if (items.length > 0) {
        this.verbalsCollection = items[0];

        this.verbalsCollection.matrixItems.sort( function(name1, name2) {
            if ( name1.index < name2.index ){
              return -1;
            }else if( name1.index > name2.index ){
                return 1;
            }else{
              return 0;	
            }
        });

        this.verbals = this.verbalsCollection.matrixItems;
      }
    })
  }




  addAffirmation() {
    var item: MatrixColleciton = {
      category: 'verbal',
      matrixItems: [
        { content: "MultiOrgasms", index: 0 },
        { content: "Orgy", index: 1 },
        { content: "Orgone", index: 2 },
        { content: "Threesome", index: 3 },
        { content: "Eso", index: 4 },
        { content: "Sex", index: 5 },
        { content: "Klitorizmus", index: 6 },
        { content: "Extasy", index: 7 },
        { content: "Sextasy", index: 8 },
        { content: "Swingers", index: 9 },
        { content: "Harem", index: 10 },
        { content: "Clitoris", index: 11 },
        { content: "Square", index: 12 },
        { content: "Prostitute", index: 13 },
        { content: "Cul de sac", index: 14 },
        { content: "Gspot", index: 15 }
      ]
    }

    this.matrixcollectionService.addItem(item).then((doc: MatrixColleciton) => {
      item.id = doc.id;
      this.matrixcollectionService.updateItem(item);
    });
  }

  moveBack(item: MatrixItem) {
    this.modifyItemIndex(item, -1);
  }

  moveFurther(item: MatrixItem) {
    this.modifyItemIndex(item, 1);
  }

  modifyItemIndex(item: MatrixItem, modifier: number) {
    
    // get clicked item from collection
    let updateItem = this.verbalsCollection.matrixItems.find(x => x.content == item.content);
    // save that item's index value
    let currentItemIndex = updateItem.index;
    // get that item's array index
    let index = this.verbalsCollection.matrixItems.indexOf(updateItem);

    // change item's index value according to modifier
    this.verbalsCollection.matrixItems[index].index = item.index + modifier;
    // change neighbouring (neighbour towards the direction of change) item's index value to that of a clicked item
    this.verbalsCollection.matrixItems[index + modifier].index = currentItemIndex;

    // update the collection
    this.matrixcollectionService.updateItem(this.verbalsCollection);
  }

}
