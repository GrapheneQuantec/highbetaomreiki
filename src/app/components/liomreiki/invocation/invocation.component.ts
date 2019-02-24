import { Component, OnInit } from '@angular/core';
import { text } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-invocation',
  templateUrl: './invocation.component.html',
  styleUrls: ['./invocation.component.css']
})
export class InvocationComponent implements OnInit {

  invocationText = `I live pro Beta OM Hui à
  I like to do Beta OM Hui à
  I love to do Beta OM Hui à
  I am lucky to do Beta OM Hui à
  My life’s Force is Beta OM Hui à
  My life’s Energy is Beta OM Hui à
  My life’s Momentum is Beta OM Hui à
  My life’s Willpower is Beta OM Hui à
  My life’s Order is Beta OM Hui à`;
  
  coloredAffirmationText: string;
  normalAffirmationText: string;
  karaokeLetterCount: number = 0;
  karaokeSpeed: number = 80;
  karaokeInterval;
  masterRotationSpeed: number = 780;
  masterInterval;
  masterIndex: number = 0;

  leftMasters = [
    [
      { name: "Cicciolina", fileName: "cic.png"},
      { name: "Cicciolina", fileName: "Cicciolina.jpg"},
      { name: "Thompson Michelle", fileName: "michelle.png"},
    ],
    [
      { name: "Cytherea", fileName: "cytherea1.jpg"},
      { name: "Cytherea", fileName: "cytherea2.jpg"},
      { name: "Sarah Carmen", fileName: "sarah_carmen.jpg"},
    ],
    [
      { name: "Om Dania Hui'a", fileName: "alphaomreiki.gif"},
      { name: "Om Dania Hui'a", fileName: "Habdank_Dania.jpg"},
      { name: "Furumoto Phyllis Lei", fileName: "lei.png"},
    ],
  ]

  constructor() { }

  ngOnInit() {
    clearInterval(this.karaokeInterval);
    this.karaokeInterval = setInterval(() => this.updateKaraoke(), this.karaokeSpeed);
    this.masterInterval = setInterval(() => this.updateMastersImages(), this.masterRotationSpeed);
  }

  updateKaraoke() {
    let texts = this.invocationText;
    this.coloredAffirmationText = texts.substring(0, this.karaokeLetterCount);
    this.normalAffirmationText = texts.substring(this.karaokeLetterCount, texts.length);
    this.karaokeLetterCount = (this.karaokeLetterCount + 1) % (texts.length + 1);
  }

  updateMastersImages() {
    this.masterIndex = (this.masterIndex + 1) % 3;
  }

}
