import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildEduComponent } from './child-edu.component';

describe('ChildEduComponent', () => {
  let component: ChildEduComponent;
  let fixture: ComponentFixture<ChildEduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildEduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
