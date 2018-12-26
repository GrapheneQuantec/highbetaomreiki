import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() text: string;
  @Input() checkedVal: boolean;
  @Output() checkedEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  check(newValue) {
    this.checkedVal = newValue;
    this.checkedEvent.emit(this.checkedVal);
  }

}
