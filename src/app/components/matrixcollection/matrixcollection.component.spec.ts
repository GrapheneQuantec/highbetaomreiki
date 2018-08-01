import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixcollectionComponent } from './matrixcollection.component';

describe('MatrixcollectionComponent', () => {
  let component: MatrixcollectionComponent;
  let fixture: ComponentFixture<MatrixcollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixcollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
