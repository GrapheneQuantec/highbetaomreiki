import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffirmationsComponent } from './affirmations.component';

describe('AffirmationsComponent', () => {
  let component: AffirmationsComponent;
  let fixture: ComponentFixture<AffirmationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffirmationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffirmationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
