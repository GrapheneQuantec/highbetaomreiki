import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
