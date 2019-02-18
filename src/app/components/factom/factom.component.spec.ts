import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactomComponent } from './factom.component';

describe('FactomComponent', () => {
  let component: FactomComponent;
  let fixture: ComponentFixture<FactomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
